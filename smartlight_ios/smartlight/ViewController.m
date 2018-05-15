//
//  ViewController.m
//  smartlight
//
//  Created by LinkDevelop on 03/03/2018.
//  Copyright © 2018 Aliyun. All rights reserved.
//

#import "ViewController.h"

#import <IMSRouter/IMSRouter.h>

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    NSURL *url = [NSURL URLWithString:@"link://__YOUR_MOBILE_PLUGIN_ID__"];
    NSDictionary *params = @{
                             @"ProductKey": @"__YOUR_DEVICE_PRODUCT_KEY__",
                             @"DeviceName": @"__YOUR_DEVICE_NAME__"
                             };
    [[IMSRouterService sharedService] openURL:url
                                      options:params
                            completionHandler:^(BOOL success) {
                                if (success) {
                                    NSLog(@"插件打开成功");
                                } else {
                                    NSLog(@"插件打开失败");
                                }
                            }];
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}


@end
