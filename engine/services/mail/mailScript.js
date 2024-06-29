function userRegistrationMailScript(name) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Success</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
        }

        p {
            color: #555555;
            line-height: 1.6;
        }

        .website-link {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            text-decoration: none;
            color: #ffffff;
            background-color: #007bff;
            border-radius: 5px;
        }

        .header-img {
          width: 100%;
          max-width: 400px;
          margin-bottom: 20px;
          border-radius: 5px;
      }

        .footer {
            margin-top: 30px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div className="container">
        <h1>Congratulations! You are registered on our platform</h1>
        <p>Hey ${name},</p>
        <p className="footer">If you have any questions or need assistance, feel free to contact us.</p>
    </div>
</body>
</html>`;
}

function userLoginMailScript(name) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login Attempt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
        }

        p {
            color: #555555;
            line-height: 1.6;
        }

        .website-link {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            text-decoration: none;
            color: #ffffff;
            background-color: #007bff;
            border-radius: 5px;
        }

        .header-img {
          width: 100%;
          max-width: 400px;
          margin-bottom: 20px;
          border-radius: 5px;
      }

        .footer {
            margin-top: 30px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div className="container">
        <p>Hey ${name}, Someone has recently logged in into your account.</p>
        <p className="footer">If this is not you, or If you have any questions or need assistance, feel free to contact us.</p>
    </div>
</body>
</html>`;
}

function userUpdateMailScript(name) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Attempt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
        }

        p {
            color: #555555;
            line-height: 1.6;
        }

        .website-link {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            text-decoration: none;
            color: #ffffff;
            background-color: #007bff;
            border-radius: 5px;
        }

        .header-img {
          width: 100%;
          max-width: 400px;
          margin-bottom: 20px;
          border-radius: 5px;
      }

        .footer {
            margin-top: 30px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div className="container">
        <p>Hey ${name}, Your profile has been updated.</p>
        <p className="footer">If this is not you, or If you have any questions or need assistance, feel free to contact us.</p>
    </div>
</body>
</html>`;
}

function userDeleteMailScript(name) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Deleted</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
        }

        p {
            color: #555555;
            line-height: 1.6;
        }

        .website-link {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            text-decoration: none;
            color: #ffffff;
            background-color: #007bff;
            border-radius: 5px;
        }

        .header-img {
          width: 100%;
          max-width: 400px;
          margin-bottom: 20px;
          border-radius: 5px;
      }

        .footer {
            margin-top: 30px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div className="container">
        <p>Hey ${name}, Your profile has been deleted.</p>
    </div>
</body>
</html>`;
}

module.exports = {
  userRegistrationMailScript,
  userLoginMailScript,
  userUpdateMailScript,
  userDeleteMailScript
};