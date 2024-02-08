from scapy.all import Ether, IP, UDP, DNS, AsyncSniffer
from core.device import Device
from core.screen import Screen
import keyboard as k
from threading import Thread, Event
import time

class Capture:
    def __init__(self, config):
        self.detected_devices = []
        self.mdnsIpDst = config['mdnsIpDst']
        self.detailed = config['detailed'] 
        self.pkts = None
        self.app_running = False
        self.pkt_count = 0

        try:
            # init screen 
            self.screen = Screen()

            # init hotkeys
            self.init_hotkeys()

            # init help
            self.sniff_help()
            input('')
        except KeyboardInterrupt:
            self.screen.print_on_screen('Killed')


    def start_app(self):
        if self.app_running:
            self.screen.print_on_screen("Encountered s: The app is already capturing ...")
            return

        self.start_capture()
        self.app_running = True


    def start_capture(self):
        self.screen.clear_screen()
        self.sniff_and_process()
        self.screen.print_on_screen("Capture started ...")


    def stop_sniffer_thread(self):
        self.pkts.stop()
        self.pkts.join()
        self.app_running = False
   

    def sniff_and_process(self):
        self.pkts = AsyncSniffer(prn=self.check_stat, filter=f"dst {self.mdnsIpDst}")
        self.pkts.start()
        

    def check_stat(self, pkt):
        self.pkt_count += 1
        incomeSrc = pkt.getlayer(IP).src
        if not any(device.ip == incomeSrc for device in self.detected_devices):
            if self.detailed == 'true':
                self.screen.print_on_screen(f"New Device Found, IP: {incomeSrc}, gathering data ...")
                self.detected_devices.append(Device([incomeSrc, self.extract_device_name(pkt), "mac address"], True))
                self.screen.print_on_screen('Fetched Data.')
            else:
                self.detected_devices.append(Device([incomeSrc, self.extract_device_name(pkt), "mac address"], False))
                self.screen.print_on_screen(f"New Device Found, IP: {incomeSrc}")
            

    def extract_device_name(self, pkt):
        return "Not Found"

    def init_hotkeys(self):
        k.add_hotkey("s", self.start_app)
        k.add_hotkey("q", self.wrap_and_exit)
        k.add_hotkey("t", self.overall_table)
        k.add_hotkey("h", self.sniff_help)
        k.add_hotkey("p", self.show_packet_count)


    def sniff_help(self):
        self.screen.clear_screen()
        self.screen.print_table([
            [0, 'Start capture', 's'],
            [1, 'Quit', 'q'],
            [2, 'Print overall table', 't'],
            [3, 'Help Table', 'h'],
            [4, 'Packet count', 'p'],
        ], ['Row', 'Action', "Hotkey"])
        

    def overall_table(self):
        self.screen.print_table(
            list(map(lambda i, x: [i, x.ip, x.name, x.mac, x.open_ports, x.state, x.host_name], range(len(self.detected_devices)), self.detected_devices)),
            ['Index', 'Ip', 'Name', 'Mac Address', 'Open Ports', 'State', 'Host Name'], 
            "orgtble", 
            True
        )

    def show_packet_count(self):
        self.screen.print_on_screen(f"Packets checked: {self.pkt_count}", True)

    def wrap_and_exit(self):
        if self.app_running:
            self.stop_sniffer_thread()

        self.screen.print_on_screen("Encountered q: Exiting ...")
        time.sleep(0.3)

        try:
            raise SystemExit
        except:
            self.screen.print_on_screen("Done")

        