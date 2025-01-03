//
//  BroadcastManager.m
//  ApplicationAmazonIVS
//
//  Created by macmini on 03/01/25.
//

#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(BroadcastManager, RCTEventEmitter)

RCT_EXTERN_METHOD(createStage:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(initializeBroadcast:(NSString *)ingestEndpoint
                  streamKey:(NSString *)streamKey
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(stopBroadcast:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
