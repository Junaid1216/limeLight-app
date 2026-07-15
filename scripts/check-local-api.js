const net = require('net');

const host = '127.0.0.1';
const port = Number(process.env.LOCAL_API_PORT || 80);

const socket = net.createConnection({ host, port }, () => {
  socket.end();
  console.log(`Local API OK: http://localhost:${port}`);
  process.exit(0);
});

socket.on('error', () => {
  console.log('');
  console.log('XAMPP Apache START karo (port ' + port + ')');
  console.log('Postman test: http://localhost/limelight-sales-perfomance/api/branch-manager-commission');
  console.log('');
  process.exit(0);
});

socket.setTimeout(3000, () => {
  socket.destroy();
  process.exit(0);
});
