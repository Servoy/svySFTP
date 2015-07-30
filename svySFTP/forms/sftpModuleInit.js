
/**
 * @public 
 * @return {Array<String>}
 *
 * @properties={typeid:24,uuid:"5F898350-9928-4DF7-BA47-A631063BF729"}
 */
function getDependencies() {
	return null;
}

/**
* @public 
* @return {String} id
*
* @properties={typeid:24,uuid:"C2612F46-C545-4345-A1C2-1EFEE5FCFE18"}
*/
function getId() {
	return "com.servoy.bap.sftp";
}

/**
* @public 
* @return {String} version
*
* @properties={typeid:24,uuid:"2EACADC5-C475-42AC-AE14-1071F5E5E010"}
*/
function getVersion() {
	return scopes.svySFTP.getVersion();
}

/**
* @public 
* @param {Object.<String,String>} startupArguments
*
* @properties={typeid:24,uuid:"8331D08B-730E-4CB6-82A6-E9F5BD749165"}
*/
function moduleInit(startupArguments) {
	try {
		new Packages.com.jcraft.jsch.JSch();
	} catch (e) {
		throw "Unable to initialize: Missing JCraft library";
	}	
}
