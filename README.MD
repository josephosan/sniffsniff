# sniffsniff

A Python tool for detecting active devices on your network. It sniffs mDNS packets broadcast by other devices on the network. Essentially, any device that connects to your network will notify you.

If you set the detailed option in your configuration file to true, it will gather more data about connected devices using python-nmap.

## installation

First, setup your venv:

```
python -m venv venv
```

Then, activate your venv:

```
source /venv/bin/activate
```

And install libraries:

```
pip install -r requirements.txt
```

Finally, run the app:

```
sudo python main.py
```

`Warning`: Make sure you run the app with sudo privileges.
