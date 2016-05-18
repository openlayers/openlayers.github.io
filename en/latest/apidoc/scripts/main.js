$(function () {
    // Search Items
    $('#search').on('keyup', function (e) {
        var value = $(this).val();
        var $el = $('.navigation');

        if (value) {
            var regexp = new RegExp(value, 'i');
            $el.find('li, .itemMembers').hide();

            $el.find('li').each(function (i, v) {
                var $item = $(v);

                if ($item.data('name') && regexp.test($item.data('name'))) {
                    $item.show();
                    $item.closest('.itemMembers').show();
                    $item.closest('.item').show();
                }
            });
        } else {
            $el.find('.item, .itemMembers').show();
        }

        $el.find('.list').scrollTop(0);
    });

    // Toggle when click an item element
    $('.navigation').on('click', '.title', function (e) {
        $(this).parent().find('.itemMembers').toggle();
    });

    // Show an item related a current documentation automatically
    var filename = $('.page-title').data('filename').replace(/\.[a-z]+$/, '');
    var $currentItem = $('.navigation .item[data-name*="' + filename + '"]:eq(0)');

    if ($currentItem.length) {
        $currentItem
            .remove()
            .prependTo('.navigation .list')
            .show()
            .find('.itemMembers')
                .show();
    }

    // Auto resizing on navigation
    var _onResize = function () {
        var height = $(window).height();
        var $el = $('.navigation');

        $el.height(height).find('.list').height(height - 133);
    };

    $(window).on('resize', _onResize);
    _onResize();

    // warn about outdated version
    var packageUrl = 'https://raw.githubusercontent.com/openlayers/openlayers.github.io/build/package.json';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', packageUrl);
    xhr.onload = function(response) {
      var json = JSON.parse(xhr.responseText);
      var latestVersion = json.version;
      var url = window.location.href;
      var branchSearch = url.match(/\/v([^\/]*)\/apidoc\//);
      var currentVersion = branchSearch ? branchSearch[1] : latestVersion;
      var cookieText = 'dismissed=-' + latestVersion + '-';
      var dismissed = document.cookie.indexOf(cookieText) != -1;
      if (!dismissed && /^[0-9\.]*$/.test(currentVersion) && currentVersion != latestVersion) {
        var link = url.replace(branchSearch[0], '/latest/apidoc/');
        var linkXhr = new XMLHttpRequest();
        linkXhr.open('HEAD', link);
        linkXhr.onload = function(response) {
          var a = document.getElementById('latest-link');
          a.href = linkXhr.status == 200 ? link : '../../latest/apidoc/';
        };
        linkXhr.send();
        var latestCheck = document.createElement('div');
        latestCheck.style.marginTop = '-10px';
        latestCheck.style.marginBottom = '10px';
        latestCheck.className = 'alert alert-warning alert-dismissable';
        latestCheck.role = 'alert';
        latestCheck.innerHTML = '<button id="latest-dismiss" type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span></button>' +
            'This documentation is for OpenLayers v<span id="package-version">' + currentVersion + '</span>. ' +
            'The <a id="latest-link" href="#" class="alert-link">latest</a> is v<span id="latest-version"></span>.';
        var alertContainer = document.getElementById('wrap').lastElementChild;
        alertContainer.insertBefore(latestCheck, alertContainer.childNodes[0]);
        document.getElementById('latest-version').innerHTML = latestVersion;
        document.getElementById('latest-dismiss').onclick = function() {
          latestCheck.style.display = 'none';
          document.cookie = cookieText;
        }
      }

      // create source code links to github
      var srcLinks = $('div.tag-source');
      var masterSearch = window.location.href.match(/\/([^\/]*\/)apidoc\//);
      if (masterSearch && masterSearch.length) {
        var branch = masterSearch[1];
        if (branch == 'latest/') {
          branch = 'v' + currentVersion + '/';
        }
        srcLinks.each(function(i, el) {
          var textParts = el.innerHTML.trim().split(', ');
          var link = 'https://github.com/openlayers/ol3/blob/' + branch +
              textParts[0];
          el.innerHTML = '<a href="' + link + '">' + textParts[0] + '</a>, ' +
              '<a href="' + link + textParts[1].replace('line ', '#l') + '">' +
              textParts[1] + '</a>';
        });
      }
    };
    xhr.send();

    // show/hide unstable items
    var links = $('a[href^="ol."]');
    var unstable = $('.unstable');
    var stabilityToggle = $('#stability-toggle');
    stabilityToggle.change(function() {
        unstable.toggleClass('hidden', this.checked);
        var search = this.checked ? '?stableonly=true' : '';
        links.each(function(i, el) {
            this.href = this.pathname + search + this.hash;
        });
        if (history.replaceState) {
            var url = window.location.pathname + search + window.location.hash;
            history.replaceState({}, '', url);
        }
        return false;
    });
    var search = window.location.search;
    links.each(function(i, el) {
        this.href = this.pathname + search + this.hash;
    });
    stabilityToggle.prop('checked', search === '?stableonly=true');
    unstable.toggleClass('hidden', stabilityToggle[0].checked);
});
