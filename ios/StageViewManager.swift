import Foundation
import React

@objc(StageViewManager)
class StageViewManager: RCTViewManager {
    override static func moduleName() -> String! {
        return "StageViewManager"
    }
    
    override class func requiresMainQueueSetup() -> Bool {
        return true
    }
    
    override func view() -> UIView! {
        return StageView()
    }
    
    
    @objc func flipCamera(_ node: NSNumber) {
        DispatchQueue.main.async {
            if let view = self.bridge?.uiManager.view(forReactTag: node) as? StageView {
                view.flipCamera()
            }
        }
    }
    
    @objc func toggleAudio(_ node: NSNumber, isMuted: Bool) {
        DispatchQueue.main.async {
            if let view = self.bridge?.uiManager.view(forReactTag: node) as? StageView {
                view.toggleAudio(isMuted)
            }
        }
    }
}
