import UIKit
import AmazonIVSBroadcast

class StageView: UIView {
    private var previewView: IVSImagePreviewView?
    private var camera: IVSCamera?
    private var microphone: IVSMicrophone?
    private let deviceDiscovery = IVSDeviceDiscovery()
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupDevices()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupDevices()
    }
    
    private func setupDevices() {
        // Setup camera
        if let camera = deviceDiscovery.listLocalDevices()
            .compactMap({ $0 as? IVSCamera })
            .first {
            self.camera = camera
            setupCameraPreview(camera)
        }
        
        // Setup microphone
        if let microphone = deviceDiscovery.listLocalDevices()
            .compactMap({ $0 as? IVSMicrophone })
            .first {
            self.microphone = microphone
            setupMicrophone(microphone)
        }
    }
    
    private func setupCameraPreview(_ camera: IVSCamera) {
        do {
            if let source = camera.listAvailableInputSources().first(where: { $0.position == .front }) {
                camera.setPreferredInputSource(source) { [weak self] error in
                    if let error = error {
                        print("Error setting camera source: \(error)")
                        return
                    }
                    do {
                        self?.previewView = try camera.previewView(with: .fill)
                        if let previewView = self?.previewView {
                            previewView.frame = self?.bounds ?? .zero
                            previewView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
                            self?.addSubview(previewView)
                        }
                    } catch {
                        print("Error creating preview view: \(error)")
                    }
                }
            }
        } catch {
            print("Error setting up camera preview: \(error)")
        }
    }
    
    private func setupMicrophone(_ microphone: IVSMicrophone) {
        microphone.isEchoCancellationEnabled = true
    }
    
    @objc func flipCamera() {
        guard let camera = camera else { return }
        let currentPosition = camera.listAvailableInputSources().first?.position
        let newPosition: IVSDevicePosition = currentPosition == .front ? IVSDevicePosition.back : IVSDevicePosition.front
        
        if let source = camera.listAvailableInputSources().first(where: { $0.position == newPosition }) {
            camera.setPreferredInputSource(source) { error in
                if let error = error {
                    print("Error flipping camera: \(error)")
                }
            }
        }
    }
    
    @objc func toggleAudio(_ isMuted: Bool) {
        microphone?.setGain(isMuted ? 0 : 1)
    }
}
