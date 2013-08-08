import os
import fileinput
import sys

cloud_app_path = '.'
list_apps = [ name for name in os.listdir(cloud_app_path) if os.path.isdir(os.path.join(cloud_app_path, name)) ]
old_product_link = 'http://media.younetco.com/wp-content/'
new_product_link = 'http://younetmedia.vn/wp-content/'

for app_name in list_apps:
	if app_name not in ['.svn', 's3', 'libraries', 'scriptdorks']:	
		app_path = os.path.join(cloud_app_path, app_name)
		config_path = os.path.join(app_path,'application/configs')
		application_ini_file = os.path.join(config_path, 'social.ini')
		if os.path.exists(application_ini_file):
			config_file = fileinput.FileInput(application_ini_file, inplace=1)
			for line in config_file:
				if old_product_link in line:
					line = line.replace(old_product_link,new_product_link)
				sys.stdout.write(line)
		else:
			print application_ini_file + ': Khong ton tai!'


