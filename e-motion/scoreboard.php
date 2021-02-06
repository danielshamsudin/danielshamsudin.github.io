<!DOCTYPE html>
<html>
<head>
	<title>Scoreboard</title>
    <meta charset="UTF-8" />
    <meta http-equiv="refresh" content="5" >
    <link rel="stylesheet" href="./scoreboard.css"/>
    <link rel="shortcut icon" href="./icon.ico" type="image/x-icon" />
</head>
<body>
    <div class="title1 rainbow-bg">
      <h1 align="center" style="margin: 0;">Scoreboard</h1>
    </div>
    <div class="score-box">
    <table class="score">
    <caption style="font-size: 12pt;">The scoreboard will refresh each 5 seconds</caption>
        <t>
            <th>Name</th>
            <th>Score</th>
        </t>
    <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "E-motion";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM scoreboard ORDER BY score DESC LIMIT 10";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
	  
    echo "<tr><td>" . $row["name"]. "</td><td>" . $row["score"]. "</td></tr>";
  }
} else {
  echo "0 results";
}
$conn->close();
?>
</table>
<div class="divcen" style="height: 130px;">
      <button
        class="scorebtn rainbow-bg"
        onclick="document.location = './index.html'"
      >
        Replay?
      </button>
    </div>
</div>
</div>
</body>
</html>
