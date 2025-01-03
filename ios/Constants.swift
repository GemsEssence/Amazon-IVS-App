//
//  Constants.swift
//  ApplicationAmazonIVS
//
//  Created by macmini on 03/01/25.
//

import Foundation

@objc(Constants)
class Constants: NSObject {
    @objc static let API_URL = "https://5j27lyi8yb.execute-api.us-east-1.amazonaws.com/prod-12211057raj/"
    
    // Avatar URLs for users
    @objc static let userAvatarUrls: [String] = [
        "https://d39ii5l128t5ul.cloudfront.net/assets/animals_square/bear.png",
        "https://d39ii5l128t5ul.cloudfront.net/assets/animals_square/bird.png",
        "https://d39ii5l128t5ul.cloudfront.net/assets/animals_square/bird2.png"
    ]
    
    @objc static let kActiveFrontCamera = "frontCameraIsActive"
}
