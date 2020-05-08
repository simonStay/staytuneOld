/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <OneSignal/OneSignal.h>
#import <GoogleMaps/GoogleMaps.h>
@import GooglePlaces;
@import Firebase;

@implementation AppDelegate
//update location

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  [OneSignal initWithLaunchOptions:launchOptions
                             appId:@"8d39b7db-d029-4bbd-af58-20e3f53cc4a9"
          handleNotificationAction:nil
                          settings:@{kOSSettingsKeyAutoPrompt: @false}];
  OneSignal.inFocusDisplayType = OSNotificationDisplayTypeNotification;
  
  // Recommend moving the below line to prompt for push after informing the user about
  // how your app will use them.
  [OneSignal promptForPushNotificationsWithUserResponse:^(BOOL accepted) {
    NSLog(@"User accepted notifications: %d", accepted);
  }];

  
  [GMSServices provideAPIKey:@"AIzaSyA_YS3aJFat9pj-zYYsVDIW192VjbzEiPc"]; // add this line using the api key obtained from Google Console
  
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"StayTune"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
   [FIRApp configure]; 
  return YES;
}



- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
