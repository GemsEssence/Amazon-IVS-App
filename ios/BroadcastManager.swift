import Foundation
import AmazonIVSBroadcast

@objc(BroadcastManager)
class BroadcastManager: RCTEventEmitter {
    override static func moduleName() -> String! {
        return "BroadcastManager"
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
    static let shared = BroadcastManager()
    private var broadcastSession: IVSBroadcastSession?
    private var broadcastDelegate: BroadcastDelegate?
    
    // Setup broadcast configuration
    private let broadcastConfig: IVSBroadcastConfiguration = {
        // Use the preset configuration
        let config = IVSPresets.configurations().standardPortrait()
        
        // Create a mixer slot configuration
        let slot = IVSMixerSlotConfiguration()
        do {
            try slot.setName("localUser")  // Set a name for the slot
            slot.size = CGSize(width: 1280, height: 720)
            slot.position = CGPoint(x: 0, y: 0)
            slot.aspect = .fit
            slot.zIndex = 1
        } catch {
            print("Error configuring mixer slot: \(error)")
        }
        
        // Set initial mixer slots
        config.mixer.slots = [slot]
        
        return config
    }()
    
    override init() {
        super.init()
        broadcastDelegate = BroadcastDelegate()
        broadcastDelegate?.broadcastManager = self
    }
    
    override func supportedEvents() -> [String]! {
        return [
            "onBroadcastStateChanged",
            "onBroadcastError"
        ]
    }
    
    @objc(createStage:rejecter:)
    func createStage(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        let body = [
            "userId": UUID().uuidString,
            "attributes": [
                "username": "User",
                "avatarUrl": Constants.userAvatarUrls.first ?? ""
            ],
            "id": ""
        ] as [String : Any]
        
        guard let url = URL(string: "\(Constants.API_URL)/create") else {
            reject("ERROR", "Invalid URL", nil)
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)
        
        URLSession.shared.dataTask(with: request) { data, response, error in
            if let error = error {
                reject("ERROR", error.localizedDescription, error)
                return
            }
            
            guard let data = data else {
                reject("ERROR", "No data received", nil)
                return
            }
            
            do {
                let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
                resolve(json)
            } catch {
                reject("ERROR", "Failed to parse response", error)
            }
        }.resume()
    }
    
    @objc(initializeBroadcast:streamKey:resolver:rejecter:)
    func initializeBroadcast(ingestEndpoint: String, streamKey: String,
                           resolve: @escaping RCTPromiseResolveBlock,
                           rejecter reject: @escaping RCTPromiseRejectBlock) {
        do {
            broadcastDelegate = BroadcastDelegate()
            broadcastSession = try IVSBroadcastSession(configuration: broadcastConfig,
                                                     descriptors: nil,
                                                     delegate: broadcastDelegate)
            
            try broadcastSession?.start(with: URL(string: "rtmps://\(ingestEndpoint)")!,
                                      streamKey: streamKey)
            resolve(["success": true])
        } catch {
            reject("ERROR", "Failed to initialize broadcast", error)
        }
    }
    
    @objc(stopBroadcast:rejecter:)
    func stopBroadcast(_ resolve: @escaping RCTPromiseResolveBlock,
                      rejecter reject: @escaping RCTPromiseRejectBlock) {
        broadcastSession?.stop()
        resolve(["success": true])
    }
}
