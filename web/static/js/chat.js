function get_all_users() {
  $.getJSON("/users", function (data) {
    console.log(data);

    var i = 0;
    $.each(data, function() {
      template = '<div class="alert alert-success" role="alert" onclick="saludar(\' saludo\')"> <span>username</span>  <span>name</span></div>';
      template = template.replace('username', data[i]['username']);
      template = template.replace('name', data[i]['name']);
      template = template.replace('saludo', data[i]['name']);
      console.log(template);
      $("#contact").append(template);
      i = i+1;
    });

  });
}

function saludar(name) {
  alert("Hello! " + name);
}
