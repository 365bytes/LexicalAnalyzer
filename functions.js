/**
  OptSystem Lexical Analyzer
  @author Devpy & 365Bytes
  @version 0.0.1 [Beta]
**/

var G = {



	isLogged: function (req, res, next) {
	    if (req.user ) next();
	    else res.redirect('/login');
	},
	isLogOut: function( req, res, next){
		if( undefined == req.user ) next();
		else res.redirect('/');
	},
	getFileExt: function(filename) {
	    var i = filename.lastIndexOf('.');
	    return (i < 0) ? '' : filename.substr(i);
	},
	pythonRegex: {

		'white': /^[ \r\t]+$/,
		'rs': /(del|from|while|as|elif|global|with|assert|else|if|pass|yield|break|except|import|print|class|exec|in|raise|continue|finally|is|return|def|for|lambda|try)/,
		'reserved': /\s?(del|from|while|as|elif|global|with|assert|else|if|pass|yield|break|except|import|print|class|exec|in|raise|continue|finally|is|return|def|for|lambda|try)\s+?/g,
		'strings': /("([^"\\]*(\\.[^"\\]*)*)"|\'([^\'\\]*(\\.[^\'\\]*)*)\')/g,
		'libs': /(string|struct|difflib|stringprep|fpformat|StringIO|cStringIO|textwrap|codecs|unicodedata|datetime|calendar|calendar|collections|heapq|bisect|array|sched|fileinput|queue|weakref|stat|filecmp|tempfile|types|numbers|copy|math|cmath|decimal|fractions|random|itertools|functools|operator|glob|fnmatch|linecache|shutil|pickle|macpath|copyreg|shelve|marshal|dbm|sqlite3|zlib|gzip|bz2|zipfile|tarfile|csv|configparser|netrc|xdrlib|plistlib|_sha1|md5|hmac|hashlib|time|argparse|optparse|getopt|logging|getpass|curses|platform|errno|ctypes|select|threading|_thread|dummy_threading|_dummy_thread|multiprocessing|mmap|rlcompleter|subprocess|socket|ssl|signal|asyncore|asynchat|email|json|mailcap|mailbox|mimetypes|base64|binhex|binascii|quopri|html|xml|webbrowser|cgi|cgitb|wsgiref|urllib|urllib2|httplib|http|ftplib|poplib|imaplib|nntplib|smtplib|smtpd|telnetlib|uuid|socketserver|BaseHTTPServer|SimpleHTTPServer|CGIHTTPServer|Cookie|cookielib|xmlrpc|SimpleXMLRPCServer|DocXMLRPCServer|audioop|imageop|aifc|sunau|wave|chunk|colorsys|imghdr|sndhdr|ossaudiodev|gettext|locale|cmd|shlex|tkinter|ttk|Tix|ScrolledText|turtle|pydoc|doctest|unittest|test|bdb|pdb|hotshot|timeit|trace|distutils|ensurepip|sys|sysconfig|__builtin__|warnings|contextlib|abc|atexit|traceback|inspect|site|user|fpectl|code|codeop|rexec|Bastion|importlib|imputil|zipimport|pkgutil|modulefinder|runpy|parser|symtable|symbol|token|keyword|tokenize|tabnanny|pyclbr|py_compile|compileall|pickletools|formatter|msilib|msvcrt|_winreg|winsound|posix|pwd|spwd|grp|crypt|dl|requests|scrapy|os|termios|tty|pty|fcntl|pipes|posixfile|resource|syslog|commands|MaccOS|macostools|findertools)/g,
		'identifiers': /[_A-Za-z][_a-zA-Z0-9]*/m,
		'initscript': /^\#\!\/usr\/bin\/python$/m,
		'math_operators': /\s+?(\+|\-|\/|\%|\*|\*\*|\/\/)/g,
		'logic_operators': /\s(and|or|not)\s/g,
		'assign_operators': /\s+?(\=|\+\=|\-\=|\*\=|\%\=|\/\=|\/\/\=|\*\*\=)\s/g,
		'rel_operators': /(\<|\>|\>\=|\<\=|\=\=|\!\=)/g,
		'symbols': /(\(|\)|\;|\,|\}|\{|\:|\[|\])/g,
		'increment': /\+\+/g,
		'decrement': /\-\-/g,
		'numbers': /-?\d+\.?\d*/g,
		'single_comments': /[\#]+.*/g,
		'comments':  /\"\"\"([^"]|[\r\n])*\"\"\"/g,
	},
	jsRegex: {
		'reserved': /\s?(break|case|catch|continue|debugger|default|delete|do|else|false|finally|for|function|if|in|instanceof|new|null|return|switch|this|throw|true|try|typeof|var|void|while|with)/g,
		
		'white': /^[ \r\t]+$/,

		'idents': /[a-zA-Z_$][0-9a-zA-Z_$]*/g,
		'numbers': /-?\d+\.?\d*/g,
		'increment': /\+\+/g,
		'decrement': /\-\-/g,
		'symbols': /(\(|\)|\;|\,|\}|\{|\[|\])/g,
		'math_operators': /(\+|\-|\/|\%|\*)/g,

		'comments': /\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\//g,
		'single_comments': /[\/]+.*/g,
		'rel_operators': /(\<|\>|\>\=|\<\=|\=\=|\!\=)/g,
		'assign_operators': /(\=|\+\=|\-\=|\*\=|\%\=|\/\=|\:)/g,
		'logic_operators': /(\|\||AND|OR|XOR|\&\&)/g,

		'strings': /("([^"\\]*(\\.[^"\\]*)*)"|\'([^\'\\]*(\\.[^\'\\]*)*)\')/g,

	}

}

module.exports = G;