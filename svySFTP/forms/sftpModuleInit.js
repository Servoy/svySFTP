/*
 * The MIT License
 * 
 * This file is part of the Servoy Business Application Platform, Copyright (C) 2012-2016 Servoy BV 
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */


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
