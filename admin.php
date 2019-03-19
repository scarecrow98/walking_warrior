<!DOCTYPE html>
<html>
   <head>
      <style>
         table {
         border-collapse: collapse;
         width: 100%;
         }
         th, td {
         text-align: left;
         padding: 8px;
         }
         tr:nth-child(even){background-color: #f2f2f2}
         th {
         background-color: #4CAF50;
         color: white;
         }
      </style>
   </head>
   <body>
      <?Php
         require "config.php"; // Database Connection
         // Create connection
         $link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
         // Check connection
         if($link === false){

             die("ERROR: Could not connect. " . mysqli_connect_error());

         }
         $sql = "SELECT id, username, tokens, steps, score, created_at, tm, gamelevel FROM users ORDER BY id";
         $result = mysqli_query($link, $sql);

         echo "<table>
         <tr>
         <th>ID</th>
         <th>UserName</th>
         <th>Tokens</th>
         <th>Steps</th>
         <th>Score</th>
         <th>Highest Level</th>
         <th>Created at</th>
         <th>Last modified</th>
         </tr>";
         if (mysqli_num_rows($result) > 0) {
             // output data of each row
             while($row = mysqli_fetch_assoc($result)) {
              echo "<tr>";
         		echo "<td>" . $row['id'] . "</td>";
         		echo "<td>" . $row['username'] . "</td>";
         		echo "<td>" . $row['tokens'] . "</td>";
         		echo "<td>" . $row['steps'] . "</td>";
         		echo "<td>" . $row['score'] . "</td>";
               echo "<td>" . $row['gamelevel'] . "</td>";
         		echo "<td>" . $row['created_at'] . "</td>";
               echo "<td>" . $row['tm'] . "</td>";
         		echo "</tr>";
         	}
         	echo "</table>";
         	} else {
         		echo "0 results";
         }

         mysqli_close($link);
         ?>
   </body>
</html>

