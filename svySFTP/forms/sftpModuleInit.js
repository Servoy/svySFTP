/*
 * This file is part of the Servoy Business Application Platform, Copyright (C) 2012-2013 Servoy BV 
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
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
