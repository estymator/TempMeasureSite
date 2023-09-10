header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

$data = json_decode(file_get_contents('php://input'), true);

echo json_encode(['status' => 'success', 'message' => 'Message received: ']);
