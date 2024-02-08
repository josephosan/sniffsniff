import curses
from tabulate import tabulate

class Screen:
    def __init__(self):
        self.screen = curses.initscr()
        self.screen.refresh()
        self.line_count = 0

    def print_on_screen(self, value, clear = False, addCounter=True):
        if clear:
            self.line_count = 0
            self.screen.clear()

        try:
            self.screen.addstr(self.line_count, 0, f"{value} \n")
            self.screen.refresh()
            if addCounter:
                self.line_count += 1
        except:
            self.clear_screen()

        
        
    def print_table(self, rows, headers, tablefmt="orgtbl", clear=False):
        try:
            self.print_on_screen(tabulate(rows, headers, tablefmt), clear, False)
            self.line_count += len(rows) + 2 # number 2 is for headers and the line below
        except:
            self.clear_screen()

    def clear_screen(self):
        self.screen.clear()
        self.screen.refresh()
        self.line_count = 0
