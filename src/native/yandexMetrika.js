/**
 * Created by Denis on 17-Jul-17.
 */
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter39906540 = new Ya.Metrika({
                id:39906540,
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                trackHash:true
            });
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");