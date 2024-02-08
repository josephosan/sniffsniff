from nmap import PortScanner

class Device:
    def __init__(self, data, detailed) -> None:
        self.ip = data[0]
        self.name = None
        self.mac = None
        self.open_ports = None
        self.state = None
        self.host_name = None

        self.ps = PortScanner()

        if detailed:
            self.get_more_info()

    def get_more_info(self):
        r = self.ps.scan(self.ip, "21-443")


        self.state = self.ps[self.ip].state()
        self.host_name = self.ps[self.ip].hostname()
        self.mac = self.ps[self.ip]['addresses']['mac']


    