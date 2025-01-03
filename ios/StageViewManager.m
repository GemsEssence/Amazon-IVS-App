//
//  StageViewManager.m
//  ApplicationAmazonIVS
//
//  Created by macmini on 03/01/25.
//

#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(StageViewManager, RCTViewManager)

RCT_EXTERN_METHOD(flipCamera:(nonnull NSNumber *)node)
RCT_EXTERN_METHOD(toggleAudio:(nonnull NSNumber *)node isMuted:(BOOL)isMuted)

@end
