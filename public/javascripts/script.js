/**
	365Bytes Network [IO] 
	@version 0.1
	Developed by Devpy & 365Bytes Team
**/
var coreApps = {

	fileData: null,
	fileExt: null,
	whiteListExts: ['.php', '.js', '.py'],
	whiteListExtsMime: ['application/x-php', 'application/javascript', 'text/x-python'],

	initUpload: function(){

		//--> check file ext
		this.fileData = jQuery('input[data-rel=lexFile]')[0].files[0];

		// check formdata support -->
		if( !window.FormData || !window.FileReader ){
			return console.log('formdata or filereader API does not support in your browser :(. Please update.');
		}

		console.log('CoreApps::Lexer -> Starting...');

		this.cleanError();
		this.sh('#panelLexemas', true );
		jQuery('#panelLexemas').find('.list-group').html('');

		//Exists File Input -->
		if( undefined == this.fileData ){
			jQuery('input[data-rel=lexFile]').focus();
			return this.showError('Please select your file.' );
		}

		jQuery('button[data-rel=lexSubmit]').html('Loading...');
		jQuery('button[data-rel=lexSubmit]').attr('disabled', 'true');

		this.getFileExt();

		console.log(coreApps.fileData.type );

		if( undefined != this.fileExt && this.whiteListExts.indexOf(this.fileExt) >= 0  ){
			this.loadLexer();
		}else{
			this.showError('Allow exts: ' + this.whiteListExts.join(' | ') );
		}

	},
	cleanError: function(){
		jQuery('#errorStart').addClass('hide');
	},
	cleanLoading: function(){
		jQuery('button[data-rel=lexSubmit]').html('<i class="fa fa-play"> Start Scan</i>');
	},
	showError: function( msg ){

		setTimeout( this.cleanLoading, 1000);
		jQuery('#errorStart').removeClass('hide').html(msg);

	},

	loadLexer: function(){
		setTimeout( this.cleanLoading, 1000);
		var formdata = new FormData();
		formdata.append('file', this.fileData);

		var reader = new FileReader();
		reader.onload = function(e) {
		    
		    // Send request contents file -->
		    console.log('Sending contents to main server: ');
		    var fileContents = reader.result;
		    var fileContentsToShow = fileContents.replace(/\n/g, "<br>");

		    jQuery.ajax({
				type:'post',
				dataType: 'json',
				data: { fileContent: btoa(reader.result), act: 'loadContents', ftype: coreApps.fileData.type },
				url: '/lexer?r=' + new Date().getTime()*1000,
				success: function( data ){
					if( data.status == 1 ){
						jQuery('#startLexContainer').fadeOut();

						setTimeout( function(){
							coreApps.loadFileContent( fileContents );
							coreApps.loadLexemas( data.lexemas );
							coreApps.loadResults( data.results );
						}, 1000 );

					}
				}
			});

		}
		
		reader.readAsText(this.fileData, 'utf-8');
		
	},
	sh: function( selector, rev ){
		if( rev ) jQuery(selector).addClass('hide');
		else jQuery(selector).removeClass('hide');
	},
	loadResults: function( presults ){

		this.sh('#panelLexicalResults', false );

		console.log(presults);

		jQuery('#panelLexicalResults').find('.list-group').html(presults);

	},
	loadLexemas: function( lexs ){
		this.sh('#panelLexemas', false );

		//console.log(lexs);

		jQuery('#panelLexemas').find('.list-group').html(lexs);
		jQuery('#panelLexemas').find('.list-group').quickPagination({pageSize:"12"});

	},
	removeOnAgain: function(){
		jQuery('#panelContents').find('code').removeClass('javascript').removeClass('python').removeClass('php');
	},
	loadFileContent: function( c ){
		this.removeOnAgain();
		var classTypeProg = ( this.fileExt == '.php' ? 'php' : ( this.fileExt == '.py' ? 'python' : 'js'));
		jQuery('#panelContents').removeClass('hide').find('.panel-body').find('pre').html(c).addClass(classTypeProg);
		// hljs.configure({useBR: true});
		// jQuery('#panelContents').find('.panel-body').find('code').each(function(i, block) {
		//   hljs.highlightBlock(block);
		// });
		jQuery('pre.code').highlight();
	},

	getFileExt: function() {

		var filename = this.fileData.name;

	    var i = filename.lastIndexOf('.');

	    this.fileExt = (i < 0) ? '' : filename.substr(i);

	},

};