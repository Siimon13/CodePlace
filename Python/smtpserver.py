from socket import *

msg = "\r\n I love computer networks!"
endmsg = "\r\n.\r\n"

# Choose a mail server (e.g. Google mail server) and call it mailserver
mailserver = ("smtp.nyu.edu", 25)

# Create socket called clientSocket and establish a TCP connection with mailserver
print "Connecting server"
clientSocket = socket(AF_INET, SOCK_STREAM)
clientSocket.connect(mailserver)
print "Finish connecting"

recv = clientSocket.recv(1024)
print recv

if recv[:3] != '220':
    print '220 reply not received from server.'

# Send HELO command and print server response.
heloCommand = 'HELO Alice\r\n'
clientSocket.send(heloCommand)
recv1 = clientSocket.recv(1024)
print recv1
if recv1[:3] != '250':
 print '250 reply not received from server.'

# Send MAIL FROM command and print server response.
print "Sending MAIL FROM"
MailFromcommand = "MAIL FROM:<sc4900@nyu.edu>\r\n"
clientSocket.send(MailFromcommand)

recv2 = clientSocket.recv(1024)
print recv2

# Send RCPT TO command and print server response.
print "Sending RCPT TO"
RcptTocommand = "RCPT TO:<chen.simon89@gmail.com>\r\n"
clientSocket.send(RcptTocommand)

recv3 = clientSocket.recv(1024)
print recv3

# Send DATA command and print server response.
print "Sending DATA"
Datacommand = "DATA\r\n"
clientSocket.send(Datacommand)

recv4 = clientSocket.recv(1024)
print recv4

# Send message data.
clientSocket.send(msg)

# Message ends with a single period.
clientSocket.send(endmsg)

recv5 = clientSocket.recv(1024)
print recv5

# Send QUIT command and get server response.
print "SEND QUIT"
Quitcommand = "QUIT\r\n"
clientSocket.send(Quitcommand)
recv6 =clientSocket.recv(1024)
print recv6

clientSocket.close()
