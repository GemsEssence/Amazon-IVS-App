//
//  BroadcastDelegate.swift
//  ApplicationAmazonIVS
//
//  Created by macmini on 03/01/25.
//

import Foundation
import AmazonIVSBroadcast

class BroadcastDelegate: NSObject, IVSBroadcastSession.Delegate {
    weak var broadcastManager: BroadcastManager?
    private let eventEmitter = RCTEventEmitter()
    
    func broadcastSession(_ session: IVSBroadcastSession, didChange state: IVSBroadcastSession.State) {
        print("IVSBroadcastSession state did change to \(state.text)")
        DispatchQueue.main.async { [weak self] in
            switch state {
            case .invalid, .disconnected, .error:
                self?.sendEvent("onBroadcastStateChanged", ["state": "disconnected"])
            case .connecting:
                self?.sendEvent("onBroadcastStateChanged", ["state": "connecting"])
            case .connected:
                self?.sendEvent("onBroadcastStateChanged", ["state": "connected"])
            @unknown default:
                print("IVSBroadcastSession did emit unknown state")
                self?.sendEvent("onBroadcastStateChanged", ["state": "unknown"])
            }
        }
    }
    
    func broadcastSession(_ session: IVSBroadcastSession, didEmitError error: Error) {
        print("IVSBroadcastSession did emit error \(error)")
        DispatchQueue.main.async { [weak self] in
            self?.sendEvent("onBroadcastError", [
                "error": error.localizedDescription
            ])
        }
    }
    
    private func sendEvent(_ eventName: String, _ params: [String: Any]) {
        broadcastManager?.sendEvent(withName: eventName, body: params)
    }
}

extension IVSBroadcastSession.State {
    var text: String {
        switch self {
        case .disconnected: return "Disconnected"
        case .connecting: return "Connecting"
        case .connected: return "Connected"
        case .invalid:  return "Invalid"
        case .error:  return "Error"
        @unknown default: return "Unknown broadcast session state"
        }
    }
}
