import urllib2
import re
from xml.dom.minidom import parse
from xml.dom.minidom import Node

def download(url):
    filename = url.split('/')[-1]
    u = urllib2.urlopen(url)
    f = open(filename,'wb')
    meta = u.info()
    filesize = int(meta.getheaders("Content-Length")[0])
    print "Downloading: %s Bytes: %s" % (filename,filesize)
    filesizedl = 0
    blocksz = 8192
    while True:
        buffer = u.read(blocksz)
        if not buffer:
            break
        filesizedl += len(buffer)
        f.write(buffer)
        status = r"%10d [%3.2f%%]" % (filesizedl, filesizedl *100./filesize)
        status = status + chr(8)*(len(status)+1)
        print status
    f.close()

def main():
    slideshowUrl = raw_input("Input a slidewhare url:")
    #slideshowUrl = 'http://www.slideshare.net/chadrobertson75/zf-modular-project'
    response = urllib2.urlopen(slideshowUrl)
    html = response.read()
    pattern = 'doc=([\w-]+)'
    match = re.findall(pattern,html,re.M|re.I)
    if(match):
        print match[0]
    else:
        print "No match!!"

    xmlurl = 'http://s3.amazonaws.com/slideshare/' + str(match[0]) +'.xml';
    doc = parse(urllib2.urlopen(xmlurl))
    for node in doc.getElementsByTagName("Slide"):
        path = node.getAttribute("Src")
        download(path)
        #print path

main()