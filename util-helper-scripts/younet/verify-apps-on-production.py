import os;
#cloud_app_path = '/home/phutp/workspace/cloud.younetco.com'
cloud_app_path = '.'
list_apps = [ name for name in os.listdir(cloud_app_path) if os.path.isdir(os.path.join(cloud_app_path, name)) ]

for app_name in list_apps:
	if app_name not in ['.svn', 's3', 'libraries']:
		app_path = os.path.join(cloud_app_path, app_name)
		config_path = os.path.join(app_path,'application/configs')
		application_ini_file = os.path.join(config_path, 'application.ini')
		try:
			if 'i2YIM0Jh28DcNBKyhxUClsOAITXSgXSVIS0OvO1q' in open(application_ini_file).read():
				print app_name + ":true" 
			else:
				print app_name + ":FAILE"
		except: 
			print "Can not get config of " + app_name

