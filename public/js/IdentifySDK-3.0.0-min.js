var IDENTIFYAPIS = IDENTIFYAPIS || {};
IDENTIFYAPIS.baseService = function(a) {
    this.accessToken = "Bearer " + a;
    this.apiAddress = "https://api.pitneybowes.com/identify";
    this.response = {}
};
IDENTIFYAPIS.baseService.prototype.callJsonApi = function(d, a) {
    var b = null;
    this.response = {};
    this.response.httpResponse = {};
    try {
        b = $.ajax({
            url: this.apiAddress + d,
            type: "POST",
            data: a,
            async: false,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                Authorization: this.accessToken
            }
        });
        this.response.response = JSON.parse(b.responseText);
        if (b.status === 200) {
            this.response.status = "success"
        } else {
            this.response.status = "failed"
        }
    } catch (c) {
        this.response.status = "failed";
        if (b.responseText !== "") {
            this.response.response = b.responseText
        } else {
            this.response.response = {};
            this.response.response.errors = [];
            this.response.response.errors.push({
                errorCode: "PB-APIM-ERR-1000",
                errorDescription: "Internal server error encountered."
            })
        }
    }
    this.response.httpResponse.status = b.status;
    this.response.httpResponse.statusText = b.statusText
};
IDENTIFYAPIS.baseService.prototype.callJsonApiAsync = function(apiUrl, postData, callback) {
    var request = $.ajax({
        url: this.apiAddress + apiUrl,
        type: "POST",
        data: postData,
        async: true,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: this.accessToken
        }
    }).done(function(responseData, status, xhr) {
        this.response = {};
        this.response.httpResponse = {};
        this.response.httpResponse.status = xhr.status;
        this.response.httpResponse.statusText = xhr.statusText;
        this.response.response = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
            this.response.status = "success"
        } else {
            this.response.status = "failed"
        }
        var callbacks = eval(callback);
        if (callbacks !== undefined && callbacks !== null) {
            callbacks(this.response)
        } else {
            alert("Callback are not available.")
        }
    }).fail(function(xhr, status, err) {
        this.response = {};
        this.response.status = "failed";
        this.response.httpResponse = {};
        this.response.httpResponse.status = xhr.status;
        this.response.httpResponse.statusText = xhr.statusText;
        if (xhr.responseText !== "") {
            this.response.response = xhr.responseText
        } else {
            this.response.response = {};
            this.response.response.errors = [];
            this.response.response.errors.push({
                errorCode: "PB-APIM-ERR-1000",
                errorDescription: "Internal server error encountered."
            })
        }
        var callbacks = eval(callback);
        if (callbacks !== undefined && callbacks !== null) {
            callbacks(this.response)
        } else {
            alert("Callback are not available.")
        }
    })
};
IDENTIFYAPIS.baseService.prototype.callXmlApi = function(d, a) {
    var b = null;
    this.response = {};
    this.response.httpResponse = {};
    try {
        b = $.ajax({
            url: this.apiAddress + d,
            type: "POST",
            data: a,
            async: false,
            headers: {
                "Content-type": "application/xml",
                Accept: "application/xml",
                Authorization: this.accessToken
            }
        });
        this.response.response = b.responseText;
        if (b.status === 200) {
            this.response.status = "success"
        } else {
            this.response.status = "failed"
        }
    } catch (c) {
        this.response.status = "failed";
        if (b.responseText !== "") {
            this.response.response = b.responseText
        } else {
            this.response.response = {};
            this.response.response.errors = [];
            this.response.response.errors.push({
                errorCode: "PB-APIM-ERR-1000",
                errorDescription: "Internal server error encountered."
            })
        }
    }
    this.response.httpResponse.status = b.status;
    this.response.httpResponse.statusText = b.statusText
};
IDENTIFYAPIS.baseService.prototype.callXmlApiAsync = function(apiUrl, postData, callback) {
    var request = $.ajax({
        url: this.apiAddress + apiUrl,
        type: "POST",
        data: postData,
        async: true,
        headers: {
            "Content-type": "application/xml",
            Accept: "application/xml",
            Authorization: this.accessToken
        }
    }).done(function(responseData, status, xhr) {
        this.response = {};
        this.response.httpResponse = {};
        this.response.httpResponse.status = xhr.status;
        this.response.httpResponse.statusText = xhr.statusText;
        this.response.response = xhr.responseText;
        if (xhr.status === 200) {
            this.response.status = "success"
        } else {
            this.response.status = "failed"
        }
        var callbacks = eval(callback);
        if (callbacks !== undefined && callbacks !== null) {
            callbacks(this.response)
        } else {
            alert("Callback are not available.")
        }
    }).fail(function(xhr, status, err) {
        this.response = {};
        this.response.status = "failed";
        this.response.httpResponse = {};
        this.response.httpResponse.status = xhr.status;
        this.response.httpResponse.statusText = xhr.statusText;
        if (xhr.responseText !== "") {
            this.response.response = xhr.responseText
        } else {
            this.response.response = {};
            this.response.response.errors = [];
            this.response.response.errors.push({
                errorCode: "PB-APIM-ERR-1000",
                errorDescription: "Internal server error encountered."
            })
        }
        var callbacks = eval(callback);
        if (callbacks !== undefined && callbacks !== null) {
            callbacks(this.response)
        } else {
            alert("Callback are not available.")
        }
    })
};

function IDENTIFYAPIS_INHERIT(c, a) {
    var b = new c();
    a.prototype = b;
    a.prototype.constructor = a
}
IDENTIFYAPIS.baseService.prototype.isJson = function(b) {
    try {
        JSON.parse(b)
    } catch (a) {
        return false
    }
    return true
};
IDENTIFYAPIS.baseService.prototype.isXml = function(a) {
    try {
        xmlDoc = $.parseXML(a);
        return true
    } catch (b) {
        return false
    }
};
IDENTIFYAPIS.identifyAddress = function(a) {
    IDENTIFYAPIS.baseService.call(this, a)
};
IDENTIFYAPIS_INHERIT(IDENTIFYAPIS.baseService, IDENTIFYAPIS.identifyAddress);
IDENTIFYAPIS.identifyAddress.prototype.validateMailingAddress = function(a, e) {
    var b = this.isJson(a);
    if (b) {
        var c = "/identifyaddress/v1/rest/validatemailingaddress/results.json";
        if (e !== undefined) {
            this.callJsonApiAsync(c, a, e)
        } else {
            this.callJsonApi(c, a);
            return this.response
        }
    } else {
        var d = this.isXml(a);
        if (d) {
            var c = "/identifyaddress/v1/rest/validatemailingaddress/results.xml";
            if (e !== undefined && e !== null) {
                this.callXmlApiAsync(c, a, e)
            } else {
                this.callXmlApi(c, a);
                return this.response
            }
        } else {
            throw new Error("PostData is of invalid type, it should be either json or xml.")
        }
    }
};
IDENTIFYAPIS.identifyEmail = function(a) {
    IDENTIFYAPIS.baseService.call(this, a)
};
IDENTIFYAPIS_INHERIT(IDENTIFYAPIS.baseService, IDENTIFYAPIS.identifyEmail);
IDENTIFYAPIS.identifyEmail.prototype.validateEmailAddress = function(a, e) {
    var b = this.isJson(a);
    if (b) {
        var c = "/identifyemail/v1/rest/validateemailaddress/results.json";
        if (e !== undefined) {
            this.callJsonApiAsync(c, a, e)
        } else {
            this.callJsonApi(c, a);
            return this.response
        }
    } else {
        var d = this.isXml(a);
        if (d) {
            var c = "/identifyemail/v1/rest/validateemailaddress/results.xml";
            if (e !== undefined && e !== null) {
                this.callXmlApiAsync(c, a, e)
            } else {
                this.callXmlApi(c, a);
                return this.response
            }
        } else {
            throw new Error("PostData is of invalid type, it should be either json or xml.")
        }
    }
};
IDENTIFYAPIS.identifyRisk = function(a) {
    IDENTIFYAPIS.baseService.call(this, a)
};
IDENTIFYAPIS_INHERIT(IDENTIFYAPIS.baseService, IDENTIFYAPIS.identifyRisk);
IDENTIFYAPIS.identifyRisk.prototype.checkGlobalWatchList = function(a, e) {
    var b = this.isJson(a);
    if (b) {
        var c = "/identifyrisk/v1/rest/checkglobalwatchlist/results.json";
        if (e !== undefined) {
            this.callJsonApiAsync(c, a, e)
        } else {
            this.callJsonApi(c, a);
            return this.response
        }
    } else {
        var d = this.isXml(a);
        if (d) {
            var c = "/identifyrisk/v1/rest/checkglobalwatchlist/results.xml";
            if (e !== undefined && e !== null) {
                this.callXmlApiAsync(c, a, e)
            } else {
                this.callXmlApi(c, a);
                return this.response
            }
        } else {
            throw new Error("PostData is of invalid type, it should be either json or xml.")
        }
    }
};
(function() {
    var g = document.getElementsByClassName("prettyprint source linenums");
    var d = 0;
    var b = 0;
    var a;
    var c;
    var f;
    var e;
    if (g && g[0]) {
        e = document.location.hash.substring(1);
        c = g[0].getElementsByTagName("li");
        f = c.length;
        for (; d < f; d++) {
            b++;
            a = "line" + b;
            c[d].id = a;
            if (a === e) {
                c[d].className += " selected"
            }
        }
    }
})();
PR.registerLangHandler(PR.createSimpleLexer([
    ["pln", /^[\t\n\f\r ]+/, null, " \t\r\n"]
], [
    ["str", /^"(?:[^\n\f\r"\\]|\\(?:\r\n?|\n|\f)|\\[\S\s])*"/, null],
    ["str", /^'(?:[^\n\f\r'\\]|\\(?:\r\n?|\n|\f)|\\[\S\s])*'/, null],
    ["lang-css-str", /^url\(([^"')]*)\)/i],
    ["kwd", /^(?:url|rgb|!important|@import|@page|@media|@charset|inherit)(?=[^\w-]|$)/i, null],
    ["lang-css-kw", /^(-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*)\s*:/i],
    ["com", /^\/\*[^*]*\*+(?:[^*/][^*]*\*+)*\//],
    ["com", /^(?:<\!--|--\>)/],
    ["lit", /^(?:\d+|\d*\.\d+)(?:%|[a-z]+)?/i],
    ["lit", /^#[\da-f]{3,6}/i],
    ["pln", /^-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*/i],
    ["pun", /^[^\s\w"']+/]
]), ["css"]);
PR.registerLangHandler(PR.createSimpleLexer([], [
    ["kwd", /^-?(?:[_a-z]|\\[\da-f]+ ?)(?:[\w-]|\\\\[\da-f]+ ?)*/i]
]), ["css-kw"]);
PR.registerLangHandler(PR.createSimpleLexer([], [
    ["str", /^[^"')]+/]
]), ["css-str"]);
var q = null;
window.PR_SHOULD_USE_CONTINUATION = !0;
(function() {
    function d(F) {
        function w(J) {
            var K = J.charCodeAt(0);
            if (K !== 92) {
                return K
            }
            var I = J.charAt(1);
            return (K = k[I]) ? K : "0" <= I && I <= "7" ? parseInt(J.substring(1), 8) : I === "u" || I === "x" ? parseInt(J.substring(2), 16) : J.charCodeAt(1)
        }

        function C(I) {
            if (I < 32) {
                return (I < 16 ? "\\x0" : "\\x") + I.toString(16)
            }
            I = String.fromCharCode(I);
            if (I === "\\" || I === "-" || I === "[" || I === "]") {
                I = "\\" + I
            }
            return I
        }

        function A(J) {
            for (var M = J.substring(1, J.length - 1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g), J = [], I = [], O = M[0] === "^", P = O ? 1 : 0, L = M.length; P < L; ++P) {
                var K = M[P];
                if (/\\[bdsw]/i.test(K)) {
                    J.push(K)
                } else {
                    var K = w(K),
                        N;
                    P + 2 < L && "-" === M[P + 1] ? (N = w(M[P + 2]), P += 2) : N = K;
                    I.push([K, N]);
                    N < 65 || K > 122 || (N < 65 || K > 90 || I.push([Math.max(65, K) | 32, Math.min(N, 90) | 32]), N < 97 || K > 122 || I.push([Math.max(97, K) & -33, Math.min(N, 122) & -33]))
                }
            }
            I.sort(function(Q, R) {
                return Q[0] - R[0] || R[1] - Q[1]
            });
            M = [];
            K = [NaN, NaN];
            for (P = 0; P < I.length; ++P) {
                L = I[P], L[0] <= K[1] + 1 ? K[1] = Math.max(K[1], L[1]) : M.push(K = L)
            }
            I = ["["];
            O && I.push("^");
            I.push.apply(I, J);
            for (P = 0; P < M.length; ++P) {
                L = M[P], I.push(C(L[0])), L[1] > L[0] && (L[1] + 1 > L[0] && I.push("-"), I.push(C(L[1])))
            }
            I.push("]");
            return I.join("")
        }

        function E(J) {
            for (var M = J.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g), I = M.length, N = [], O = 0, L = 0; O < I; ++O) {
                var K = M[O];
                K === "(" ? ++L : "\\" === K.charAt(0) && (K = +K.substring(1)) && K <= L && (N[K] = -1)
            }
            for (O = 1; O < N.length; ++O) {
                -1 === N[O] && (N[O] = ++G)
            }
            for (L = O = 0; O < I; ++O) {
                K = M[O], K === "(" ? (++L, N[L] === void 0 && (M[O] = "(?:")) : "\\" === K.charAt(0) && (K = +K.substring(1)) && K <= L && (M[O] = "\\" + N[L])
            }
            for (L = O = 0; O < I; ++O) {
                "^" === M[O] && "^" !== M[O + 1] && (M[O] = "")
            }
            if (J.ignoreCase && H) {
                for (O = 0; O < I; ++O) {
                    K = M[O], J = K.charAt(0), K.length >= 2 && J === "[" ? M[O] = A(K) : J !== "\\" && (M[O] = K.replace(/[A-Za-z]/g, function(P) {
                        P = P.charCodeAt(0);
                        return "[" + String.fromCharCode(P & -33, P | 32) + "]"
                    }))
                }
            }
            return M.join("")
        }
        for (var G = 0, H = !1, x = !1, u = 0, D = F.length; u < D; ++u) {
            var B = F[u];
            if (B.ignoreCase) {
                x = !0
            } else {
                if (/[a-z]/i.test(B.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi, ""))) {
                    H = !0;
                    x = !1;
                    break
                }
            }
        }
        for (var k = {
                b: 8,
                t: 9,
                n: 10,
                v: 11,
                f: 12,
                r: 13
            }, v = [], u = 0, D = F.length; u < D; ++u) {
            B = F[u];
            if (B.global || B.multiline) {
                throw Error("" + B)
            }
            v.push("(?:" + E(B) + ")")
        }
        return RegExp(v.join("|"), x ? "gi" : "g")
    }

    function c(B) {
        function u(E) {
            switch (E.nodeType) {
                case 1:
                    if (x.test(E.className)) {
                        break
                    }
                    for (var F = E.firstChild; F; F = F.nextSibling) {
                        u(F)
                    }
                    F = E.nodeName;
                    if ("BR" === F || "LI" === F) {
                        w[D] = "\n", C[D << 1] = A++, C[D++ << 1 | 1] = E
                    }
                    break;
                case 3:
                case 4:
                    F = E.nodeValue, F.length && (F = k ? F.replace(/\r\n?/g, "\n") : F.replace(/[\t\n\r ]+/g, " "), w[D] = F, C[D << 1] = A, A += F.length, C[D++ << 1 | 1] = E)
            }
        }
        var x = /(?:^|\s)nocode(?:\s|$)/,
            w = [],
            A = 0,
            C = [],
            D = 0,
            v;
        B.currentStyle ? v = B.currentStyle.whiteSpace : window.getComputedStyle && (v = document.defaultView.getComputedStyle(B, q).getPropertyValue("white-space"));
        var k = v && "pre" === v.substring(0, 3);
        u(B);
        return {
            a: w.join("").replace(/\n$/, ""),
            c: C
        }
    }

    function t(u, k, w, v) {
        k && (u = {
            a: k,
            d: u
        }, w(u), v.push.apply(v, u.e))
    }

    function h(u, k) {
        function x(P) {
            for (var F = P.d, C = [F, "pln"], L = 0, J = P.a.match(A) || [], B = {}, E = 0, N = J.length; E < N; ++E) {
                var K = J[E],
                    O = B[K],
                    D = void 0,
                    M;
                if (typeof O === "string") {
                    M = !1
                } else {
                    var I = w[K.charAt(0)];
                    if (I) {
                        D = K.match(I[1]), O = I[0]
                    } else {
                        for (M = 0; M < v; ++M) {
                            if (I = k[M], D = K.match(I[1])) {
                                O = I[0];
                                break
                            }
                        }
                        D || (O = "pln")
                    }
                    if ((M = O.length >= 5 && "lang-" === O.substring(0, 5)) && !(D && typeof D[1] === "string")) {
                        M = !1, O = "src"
                    }
                    M || (B[K] = O)
                }
                I = L;
                L += K.length;
                if (M) {
                    M = D[1];
                    var H = K.indexOf(M),
                        G = H + M.length;
                    D[2] && (G = K.length - D[2].length, H = G - M.length);
                    O = O.substring(5);
                    t(F + I, K.substring(0, H), x, C);
                    t(F + I + H, M, s(O, M), C);
                    t(F + I + G, K.substring(G), x, C)
                } else {
                    C.push(F + I, O)
                }
            }
            P.e = C
        }
        var w = {},
            A;
        (function() {
            for (var G = u.concat(k), B = [], F = {}, H = 0, E = G.length; H < E; ++H) {
                var D = G[H],
                    I = D[3];
                if (I) {
                    for (var C = I.length; --C >= 0;) {
                        w[I.charAt(C)] = D
                    }
                }
                D = D[1];
                I = "" + D;
                F.hasOwnProperty(I) || (B.push(D), F[I] = q)
            }
            B.push(/[\S\s]/);
            A = d(B)
        })();
        var v = k.length;
        return x
    }

    function o(u) {
        var k = [],
            w = [];
        u.tripleQuotedStrings ? k.push(["str", /^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/, q, "'\""]) : u.multiLineStrings ? k.push(["str", /^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/, q, "'\"`"]) : k.push(["str", /^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/, q, "\"'"]);
        u.verbatimStrings && w.push(["str", /^@"(?:[^"]|"")*(?:"|$)/, q]);
        var v = u.hashComments;
        v && (u.cStyleComments ? (v > 1 ? k.push(["com", /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, q, "#"]) : k.push(["com", /^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\n\r]*)/, q, "#"]), w.push(["str", /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/, q])) : k.push(["com", /^#[^\n\r]*/, q, "#"]));
        u.cStyleComments && (w.push(["com", /^\/\/[^\n\r]*/, q]), w.push(["com", /^\/\*[\S\s]*?(?:\*\/|$)/, q]));
        u.regexLiterals && w.push(["lang-regex", /^(?:^^\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\(|\*|\*=|\+=|,|-=|->|\/|\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\^=|\^\^|\^\^=|{|\||\|=|\|\||\|\|=|~|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\s*(\/(?=[^*/])(?:[^/[\\]|\\[\S\s]|\[(?:[^\\\]]|\\[\S\s])*(?:]|$))+\/)/]);
        (v = u.types) && w.push(["typ", v]);
        u = ("" + u.keywords).replace(/^ | $/g, "");
        u.length && w.push(["kwd", RegExp("^(?:" + u.replace(/[\s,]+/g, "|") + ")\\b"), q]);
        k.push(["pln", /^\s+/, q, " \r\n\t\xa0"]);
        w.push(["lit", /^@[$_a-z][\w$@]*/i, q], ["typ", /^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/, q], ["pln", /^[$_a-z][\w$@]*/i, q], ["lit", /^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i, q, "0123456789"], ["pln", /^\\[\S\s]?/, q], ["pun", /^.[^\s\w"-$'./@\\`]*/, q]);
        return h(k, w)
    }

    function r(H, x) {
        function E(K) {
            switch (K.nodeType) {
                case 1:
                    if (B.test(K.className)) {
                        break
                    }
                    if ("BR" === K.nodeName) {
                        C(K), K.parentNode && K.parentNode.removeChild(K)
                    } else {
                        for (K = K.firstChild; K; K = K.nextSibling) {
                            E(K)
                        }
                    }
                    break;
                case 3:
                case 4:
                    if (v) {
                        var k = K.nodeValue,
                            L = k.match(I);
                        if (L) {
                            var M = k.substring(0, L.index);
                            K.nodeValue = M;
                            (k = k.substring(L.index + L[0].length)) && K.parentNode.insertBefore(J.createTextNode(k), K.nextSibling);
                            C(K);
                            M || K.parentNode.removeChild(K)
                        }
                    }
            }
        }

        function C(K) {
            function k(M, R) {
                var Q = R ? M.cloneNode(!1) : M,
                    P = M.parentNode;
                if (P) {
                    var P = k(P, 1),
                        O = M.nextSibling;
                    P.appendChild(Q);
                    for (var N = O; N; N = O) {
                        O = N.nextSibling, P.appendChild(N)
                    }
                }
                return Q
            }
            for (; !K.nextSibling;) {
                if (K = K.parentNode, !K) {
                    return
                }
            }
            for (var K = k(K.nextSibling, 0), L;
                (L = K.parentNode) && L.nodeType === 1;) {
                K = L
            }
            F.push(K)
        }
        var B = /(?:^|\s)nocode(?:\s|$)/,
            I = /\r\n?|\n/,
            J = H.ownerDocument,
            A;
        H.currentStyle ? A = H.currentStyle.whiteSpace : window.getComputedStyle && (A = J.defaultView.getComputedStyle(H, q).getPropertyValue("white-space"));
        var v = A && "pre" === A.substring(0, 3);
        for (A = J.createElement("LI"); H.firstChild;) {
            A.appendChild(H.firstChild)
        }
        for (var F = [A], D = 0; D < F.length; ++D) {
            E(F[D])
        }
        x === (x | 0) && F[0].setAttribute("value", x);
        var u = J.createElement("OL");
        u.className = "linenums";
        for (var w = Math.max(0, x - 1 | 0) || 0, D = 0, G = F.length; D < G; ++D) {
            A = F[D], A.className = "L" + (D + w) % 10, A.firstChild || A.appendChild(J.createTextNode("\xa0")), u.appendChild(A)
        }
        H.appendChild(u)
    }

    function z(u, k) {
        for (var w = k.length; --w >= 0;) {
            var v = k[w];
            y.hasOwnProperty(v) ? window.console && console.warn("cannot override language handler %s", v) : y[v] = u
        }
    }

    function s(u, k) {
        if (!u || !y.hasOwnProperty(u)) {
            u = /^\s*</.test(k) ? "default-markup" : "default-code"
        }
        return y[u]
    }

    function p(X) {
        var L = X.g;
        try {
            var T = c(X.h),
                Q = T.a;
            X.a = Q;
            X.c = T.c;
            X.d = 0;
            s(L, Q)(X);
            var N = /\bMSIE\b/.test(navigator.userAgent),
                L = /\n/g,
                F = X.a,
                G = F.length,
                T = 0,
                M = X.c,
                I = M.length,
                Q = 0,
                U = X.e,
                R = U.length,
                X = 0;
            U[R] = G;
            var H, K;
            for (K = H = 0; K < R;) {
                U[K] !== U[K + 2] ? (U[H++] = U[K++], U[H++] = U[K++]) : K += 2
            }
            R = H;
            for (K = H = 0; K < R;) {
                for (var A = U[K], S = U[K + 1], W = K + 2; W + 2 <= R && U[W + 1] === S;) {
                    W += 2
                }
                U[H++] = A;
                U[H++] = S;
                K = W
            }
            for (U.length = H; Q < I;) {
                var J = M[Q + 2] || G,
                    V = U[X + 2] || G,
                    W = Math.min(J, V),
                    P = M[Q + 1],
                    O;
                if (P.nodeType !== 1 && (O = F.substring(T, W))) {
                    N && (O = O.replace(L, "\r"));
                    P.nodeValue = O;
                    var E = P.ownerDocument,
                        D = E.createElement("SPAN");
                    D.className = U[X + 1];
                    var B = P.parentNode;
                    B.replaceChild(D, P);
                    D.appendChild(P);
                    T < J && (M[Q + 1] = P = E.createTextNode(F.substring(W, J)), B.insertBefore(P, D.nextSibling))
                }
                T = W;
                T >= J && (Q += 2);
                T >= V && (X += 2)
            }
        } catch (C) {
            "console" in window && console.log(C && C.stack ? C.stack : C)
        }
    }
    var m = ["break,continue,do,else,for,if,return,while"],
        j = [
            [m, "auto,case,char,const,default,double,enum,extern,float,goto,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"
        ],
        n = [j, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,export,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],
        l = [j, "abstract,boolean,byte,extends,final,finally,implements,import,instanceof,null,native,package,strictfp,super,synchronized,throws,transient"],
        i = [l, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,interface,internal,into,is,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var"],
        j = [j, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],
        g = [m, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
        f = [m, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],
        m = [m, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"],
        e = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)/,
        b = /\S/,
        a = o({
            keywords: [n, i, j, "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END" + g, f, m],
            hashComments: !0,
            cStyleComments: !0,
            multiLineStrings: !0,
            regexLiterals: !0
        }),
        y = {};
    z(a, ["default-code"]);
    z(h([], [
        ["pln", /^[^<?]+/],
        ["dec", /^<!\w[^>]*(?:>|$)/],
        ["com", /^<\!--[\S\s]*?(?:--\>|$)/],
        ["lang-", /^<\?([\S\s]+?)(?:\?>|$)/],
        ["lang-", /^<%([\S\s]+?)(?:%>|$)/],
        ["pun", /^(?:<[%?]|[%?]>)/],
        ["lang-", /^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],
        ["lang-js", /^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],
        ["lang-css", /^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],
        ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]
    ]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]);
    z(h([
        ["pln", /^\s+/, q, " \t\r\n"],
        ["atv", /^(?:"[^"]*"?|'[^']*'?)/, q, "\"'"]
    ], [
        ["tag", /^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],
        ["atn", /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],
        ["lang-uq.val", /^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],
        ["pun", /^[/<->]+/],
        ["lang-js", /^on\w+\s*=\s*"([^"]+)"/i],
        ["lang-js", /^on\w+\s*=\s*'([^']+)'/i],
        ["lang-js", /^on\w+\s*=\s*([^\s"'>]+)/i],
        ["lang-css", /^style\s*=\s*"([^"]+)"/i],
        ["lang-css", /^style\s*=\s*'([^']+)'/i],
        ["lang-css", /^style\s*=\s*([^\s"'>]+)/i]
    ]), ["in.tag"]);
    z(h([], [
        ["atv", /^[\S\s]+/]
    ]), ["uq.val"]);
    z(o({
        keywords: n,
        hashComments: !0,
        cStyleComments: !0,
        types: e
    }), ["c", "cc", "cpp", "cxx", "cyc", "m"]);
    z(o({
        keywords: "null,true,false"
    }), ["json"]);
    z(o({
        keywords: i,
        hashComments: !0,
        cStyleComments: !0,
        verbatimStrings: !0,
        types: e
    }), ["cs"]);
    z(o({
        keywords: l,
        cStyleComments: !0
    }), ["java"]);
    z(o({
        keywords: m,
        hashComments: !0,
        multiLineStrings: !0
    }), ["bsh", "csh", "sh"]);
    z(o({
        keywords: g,
        hashComments: !0,
        multiLineStrings: !0,
        tripleQuotedStrings: !0
    }), ["cv", "py"]);
    z(o({
        keywords: "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",
        hashComments: !0,
        multiLineStrings: !0,
        regexLiterals: !0
    }), ["perl", "pl", "pm"]);
    z(o({
        keywords: f,
        hashComments: !0,
        multiLineStrings: !0,
        regexLiterals: !0
    }), ["rb"]);
    z(o({
        keywords: j,
        cStyleComments: !0,
        regexLiterals: !0
    }), ["js"]);
    z(o({
        keywords: "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,true,try,unless,until,when,while,yes",
        hashComments: 3,
        cStyleComments: !0,
        multilineStrings: !0,
        tripleQuotedStrings: !0,
        regexLiterals: !0
    }), ["coffee"]);
    z(h([], [
        ["str", /^[\S\s]+/]
    ]), ["regex"]);
    window.prettyPrintOne = function(u, k, w) {
        var v = document.createElement("PRE");
        v.innerHTML = u;
        w && r(v, w);
        p({
            g: k,
            i: w,
            h: v
        });
        return v.innerHTML
    };
    window.prettyPrint = function(E) {
        function v() {
            for (var L = window.PR_SHOULD_USE_CONTINUATION ? w.now() + 250 : Infinity; u < A.length && w.now() < L; u++) {
                var O = A[u],
                    I = O.className;
                if (I.indexOf("prettyprint") >= 0) {
                    var I = I.match(B),
                        K, H;
                    if (H = !I) {
                        H = O;
                        for (var M = void 0, N = H.firstChild; N; N = N.nextSibling) {
                            var J = N.nodeType,
                                M = J === 1 ? M ? H : N : J === 3 ? b.test(N.nodeValue) ? H : M : M
                        }
                        H = (K = M === H ? void 0 : M) && "CODE" === K.tagName
                    }
                    H && (I = K.className.match(B));
                    I && (I = I[1]);
                    H = !1;
                    for (M = O.parentNode; M; M = M.parentNode) {
                        if ((M.tagName === "pre" || M.tagName === "code" || M.tagName === "xmp") && M.className && M.className.indexOf("prettyprint") >= 0) {
                            H = !0;
                            break
                        }
                    }
                    H || ((H = (H = O.className.match(/\blinenums\b(?::(\d+))?/)) ? H[1] && H[1].length ? +H[1] : !0 : !1) && r(O, H), D = {
                        g: I,
                        h: O,
                        i: H
                    }, p(D))
                }
            }
            u < A.length ? setTimeout(v, 250) : E && E()
        }
        for (var C = [document.getElementsByTagName("pre"), document.getElementsByTagName("code"), document.getElementsByTagName("xmp")], A = [], x = 0; x < C.length; ++x) {
            for (var F = 0, G = C[x].length; F < G; ++F) {
                A.push(C[x][F])
            }
        }
        var C = q,
            w = Date;
        w.now || (w = {
            now: function() {
                return +new Date
            }
        });
        var u = 0,
            D, B = /\blang(?:uage)?-([\w.]+)(?!\S)/;
        v()
    };
    window.PR = {
        createSimpleLexer: h,
        registerLangHandler: z,
        sourceDecorator: o,
        PR_ATTRIB_NAME: "atn",
        PR_ATTRIB_VALUE: "atv",
        PR_COMMENT: "com",
        PR_DECLARATION: "dec",
        PR_KEYWORD: "kwd",
        PR_LITERAL: "lit",
        PR_NOCODE: "nocode",
        PR_PLAIN: "pln",
        PR_PUNCTUATION: "pun",
        PR_SOURCE: "src",
        PR_STRING: "str",
        PR_TAG: "tag",
        PR_TYPE: "typ"
    }
})();
