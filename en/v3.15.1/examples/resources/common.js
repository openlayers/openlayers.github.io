(function() {

  // show outdated version warning
  var container = document.getElementsByClassName('container-fluid')[0];
  var div = document.createElement('div');
  div.id = 'latest-check';
  div.className = 'alert alert-warning alert-dismissible';
  div.setAttribute('role', 'alert');
  div.style.display = 'none';
  div.innerHTML = '<button id="latest-dismiss" type="button" class="close" data-dismiss="alert" aria-label="Close">' +
      '<span aria-hidden="true">&times;</span></button>' +
      'This example uses OpenLayers <span id="current-version"></span>. ' +
      'The <a id="latest-link" href="#" class="alert-link">latest</a> is v<span id="latest-version"></span>.';
  container.insertBefore(div, container.firstChild);
  var packageUrl = 'https://raw.githubusercontent.com/openlayers/openlayers.github.io/build/package.json';
  var xhr = new XMLHttpRequest();
  xhr.open('GET', packageUrl);
  xhr.onload = function(response) {
    var json = JSON.parse(xhr.responseText);
    var latestVersion = json.version;
    document.getElementById('latest-version').innerHTML = latestVersion;
    var url = window.location.href;
    var branchSearch = url.match(/\/([^\/]*)\/examples\//);
    var cookieText = 'dismissed=-' + latestVersion + '-';
    var dismissed = document.cookie.indexOf(cookieText) != -1;
    if (branchSearch[1] !== ('v' + latestVersion) && !dismissed) {
      document.getElementById('current-version').innerHTML = branchSearch[1];
      var link = url.replace(branchSearch[0], '/latest/examples/');
      var linkXhr = new XMLHttpRequest();
      linkXhr.open('HEAD', link);
      linkXhr.onload = function(response) {
        var a = document.getElementById('latest-link');
        a.href = linkXhr.status == 200 ? link : '../../latest/examples/';
      };
      linkXhr.send();
      var latestCheck = document.getElementById('latest-check');
      latestCheck.style.display = '';
      document.getElementById('latest-dismiss').onclick = function() {
        latestCheck.style.display = 'none';
        document.cookie = cookieText;
      }
    }
  };
  xhr.send();

  var copyButton = document.getElementById('copy-button');
  if (copyButton) {
    var data = document.getElementById('example-source').textContent;
    new ZeroClipboard(copyButton).on('copy', function(event) {
      event.clipboardData.setData({
        'text/plain': data,
        'text/html': data
      });
    });
  }

  var fiddleButton = document.getElementById('jsfiddle-button');
  if (fiddleButton) {
    fiddleButton.onclick = function(event) {
      event.preventDefault();
      document.getElementById('jsfiddle-form').submit();
    };
  }

  if (window.location.host === 'localhost:3000') {
    return;
  }

  var container = document.getElementById('navbar-logo-container');
  if (!container) {
    return;
  }

  var form = document.createElement('form');
  var select = document.createElement('select');
  var possibleModes = {
    'raw' : 'Development',
    'advanced': 'Production'
  };
  var urlMode = window.location.href.match(/mode=([a-z0-9\-]+)\&?/i);
  var curMode = urlMode ? urlMode[1] : 'advanced';

  for (var mode in possibleModes) {
    if (possibleModes.hasOwnProperty(mode)) {
      var option = document.createElement('option');
      var modeTxt = possibleModes[mode];
      option.value = mode;
      option.innerHTML = modeTxt;
      option.selected = curMode === mode;
      select.appendChild(option);
    }
  }

  select.onchange = function(event) {
    var newMode = event.target.value;
    var search = window.location.search.substring(1);
    var baseUrl = window.location.href.split('?')[0];
    var chunks = search ? search.split('&') : [];
    var pairs = [];
    var modeFound = false;
    for (var i = chunks.length - 1; i >= 0; --i) {
      var pair = chunks[i].split('=');
      if (pair[0].toLowerCase() === 'mode') {
        pair[1] = newMode;
        modeFound = true;
      }
      var adjusted = encodeURIComponent(pair[0]);
      if (typeof pair[1] !== undefined) {
        adjusted += '=' + encodeURIComponent(pair[1] || '');
      }
      pairs.push(adjusted);
    }
    if (!modeFound) {
      pairs.push('mode=' + encodeURIComponent(newMode));
    }
    location.href = baseUrl + '?' + pairs.join('&');
  };

  select.className = 'input-medium';

  form.className = 'navbar-form version-form';
  form.appendChild(select);

  container.appendChild(form);
})();

var common = {};

common.getRendererFromQueryString = function(opt_default) {
  var obj = {};
  var queryString = location.search.slice(1);
  var re = /([^&=]+)=([^&]*)/g;

  var m = re.exec(queryString);
  while (m) {
    obj[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    m = re.exec(queryString);
  }
  if ('renderers' in obj) {
    return obj['renderers'].split(',');
  } else if ('renderer' in obj) {
    return [obj['renderer']];
  } else {
    return opt_default;
  }
};
