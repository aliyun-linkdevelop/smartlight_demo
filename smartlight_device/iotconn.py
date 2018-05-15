import hashlib, hmac, time, json, sys

def make_hmacsha1_hexdigest(key, data):
  """Generate HMAC-SHA1 Signature"""
  key = key.encode()
  data = data.encode()
  return hmac.new(key, data, hashlib.sha1).hexdigest()

def sign_for_device(device_product_key, device_name, device_secret):
  """Generate signature for divice"""
  timestamp = int(time.time()*1000)
  timestamp = 1520402850872
  device_client_id = "%s&%s" % (device_name, device_product_key)
  device_sign_content = "clientId%sdeviceName%sproductKey%stimestamp%d" % (device_client_id, device_name, device_product_key, timestamp)
  print 'sign content', device_sign_content
  device_sign = make_hmacsha1_hexdigest(device_secret, device_sign_content)
  return {
    "aliyun_iot": {
      "product_key": device_product_key,
      "device_name": device_name
    },
    "mqtt": {
      "enable": True,
      "server": "%s.iot-as-mqtt.cn-shanghai.aliyuncs.com" % device_product_key.lower(),
      "client_id": "%s|securemode=3,signmethod=hmacsha1,timestamp=%d|" % (device_client_id, timestamp),
      "user": device_client_id,
      "pass": device_sign,
      "clean_session": True,
      "keep_alive": 60,
      "max_qos": 0
    }
  }

if __name__ == "__main__":
  argv = sys.argv
  if len(argv) == 4:
    productKey = argv[1]
    deviceName = argv[2]
    deviceSecret = argv[3]
    print json.dumps(sign_for_device(productKey, deviceName, deviceSecret), indent=4)
  else:
    print 'Usage:\npython iotconn.py productKey deviceName deviceSecret'
