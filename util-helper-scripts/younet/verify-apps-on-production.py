import os;
cloud_app_path = '/home/phutp/workspace/cloud.younetco.com';
list_apps = [ name for name in os.listdir(cloud_app_path) if os.path.isdir(os.path.join(cloud_app_path, name)) ];
print list_apps;
