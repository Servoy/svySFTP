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
 * Get's the logger for this module
 * 
 * @public 
 * @return {scopes.svyLogManager.Logger}
 * 
 * @properties={typeid:24,uuid:"D64368CE-B15B-4C98-A3F2-A882F5389497"}
 */
function getLogger(){
	return scopes.svyLogManager.getLogger("com.servoy.bap.sftp")
}

/**
 * @public 
 * @properties={typeid:24,uuid:"0023DD31-61C0-41C5-9F44-F8BBC8527E16"}
 */
function getVersion(){
	return "0.1.0";
}

/**
 * @public  
 * @param {String} host
 * @param {String} userName
 * @param {String} password
 * @param {Number} [port] Default is 22
 * @return {SFTPClient}
 * @properties={typeid:24,uuid:"70B592DA-3124-4675-8DE2-2B5D8F7FE854"}
 */
function createClient(host,userName,password,port){
	return new SFTPClient(host,userName,password,port);
}

/**
 * @private 
 * @param {String} host
 * @param {String} userName
 * @param {String} password
 * @param {Number} [port] Default is 22
 * @constructor 
 * @properties={typeid:24,uuid:"49A04A57-9E89-4F60-8EDA-DB0F674D5170"}
 */
function SFTPClient(host,userName,password,port){

	if(!port){
		port = 22;
	}
	
    /**
     * @private 
     * @type {Packages.com.jcraft.jsch.JSch}
     */
    var client = null;
     
    var session = null;
    /**
     * @private 
     * @type {Packages.com.jcraft.jsch.ChannelSftp}
     */
    var sftp = null;
     
    var userInfo = {
        showMessage:function(arg0){},
        promptYesNo:function(arg0){return true;},
        promptPassword:function(arg0){return true;},
        promptPassphrase:function(arg0){return true;},
        getPassword:function(){return password;},
        getPassphrase:function(){return null;}
    };
    var to = 0;
     
    
    this.getHost = function(){
        return host;
    }
    
    this.getPort = function(){
        return port;
    }
    
    this.getUsername = function(){
        return userName;
    }
    
    this.getPassword = function(){
        return password;
    }
    
    this.setTimeOut = function(timeOut){
        to = timeOut;
        return this;
    }
    this.getTimeOut = function(){
        return to;
    }
     
    this.connect = function(){
        if(!this.isConnected()){
            getSession().connect(to);
            getSFTP().connect(to);
        }
    }
    this.isConnected = function(){
        return getSession().isConnected();
    }
    this.disconnect = function(){
        if(this.isConnected()){
            getSession().disconnect();
            sftp.disconnect();
        }
    }
     
    /**
     * @public 
     * @return {Array<RemoteFile>}
     */
    this.ls = function(path){
        var result = [];
        var v = getSFTP().ls(path);
        var i = v.iterator()
        while(i.hasNext()){
            /** @type {Packages.com.jcraft.jsch.ChannelSftp.LsEntry} */
            var entry = i.next();
            result.push(new RemoteFile(entry));
        }
        return result;
    }
     
    /**
     * @public 
     * @param {RemoteFile} src
     * @param {String|plugins.file.JSFile} [dest] The destination file
     * @param {Function} [callback]
     * @return {String} The absolute file path of the destination 
     */
    this.get = function(src, dest, callback){
        var monitor = new ProgressMonitorInternal(callback);
        if(!dest){
            dest = src.getName();
        }
        if(dest instanceof String){
            dest = plugins.file.convertToJSFile(dest)
        }
        var path = dest.getAbsolutePath();
        var output = new java.io.FileOutputStream(path);
        try{
            var internalMonitor = new Packages.com.jcraft.jsch.SftpProgressMonitor(monitor);
            getSFTP().get(src.getName(),output, internalMonitor);
            return path;
        } finally {
            output.close();
        }
    }
     
    /**
     * @public 
     * @param {String} src The path or file to upload
     * @param {String} [dest] The target file name / path 
     * @param {Function} [callback]
     * @return {String} The destination file
     */
    this.put = function(src, dest, callback){
        var monitor = new ProgressMonitorInternal(callback);
        var internalMonitor = new Packages.com.jcraft.jsch.SftpProgressMonitor(monitor);
        getSFTP().put(src,dest,internalMonitor);
        return dest;
  
    }
     
    /**
     * @public 
     * @param {String} path
     */
    this.cd = function(path){
        getSFTP().cd(path);
    }
    /**
     * @private 
     * @param {SFTPClient} sftpClient
     */
    function checkConnection(sftpClient){
        if(!sftpClient.isConnected()){
            throw "No Connection or timed out. Call client.connect()";
        }
    }
     
     
    /**
     * @private 
     * @return {Packages.com.jcraft.jsch.ChannelSftp}
     */
    function getSFTP(){
        if(!sftp){
            sftp = getSession().openChannel("sftp");
        }
        return sftp;
    }
     
     
    /**
     * @private 
     * @return {Packages.com.jcraft.jsch.Session}
     */
    function getSession(){
        if(!session){
            // TODO validate state
            session = getClient().getSession(userName,host,port);
            session.setUserInfo(new Packages.com.jcraft.jsch.UserInfo(userInfo));
        }
        return session;
    }
     
    /**
     * @private 
     * @return {Packages.com.jcraft.jsch.JSch}
     */
    function getClient(){
        if(!client){
            client = new Packages.com.jcraft.jsch.JSch();
        }
        return client;
    }
}
  
/**
 * @private
 * @param {Packages.com.jcraft.jsch.ChannelSftp.LsEntry} entry
 * @constructor 
 * @properties={typeid:24,uuid:"6F245B9D-347F-4147-8AF9-02D270B7D8D5"}
 */
function RemoteFile(entry){
  
    /**
     * @public 
     * @return {String}
     */
    this.getName = function(){
        return entry.getFilename();
    }
  
    /**
     * @public 
     * @return {Number} FIle size (in bytes)
     */
    this.getSize = function(){
        return entry.getAttrs().getSize();
    }
     
    /**
     * @public 
     * @return {Date}
     */
    this.getModificationTime = function(){
        return new Date(entry.getAttrs().getMTime());
    }
     
    /**
     * @public 
     * @return {Boolean}
     */
    this.isDir = function(){
        return entry.getAttrs().isDir();
    }   
}
  
/**
 * @private 
 * @param {Function} [callback]
 * @constructor 
 * @properties={typeid:24,uuid:"BC23491C-9CAA-445F-86D6-88F0829FB855"}
 */
function ProgressMonitorInternal(callback){
     
    var progressMode = null
    var maxCount = null;
    var currentCount = 0;
    var source = null;
    var destination = null;
    var cancelled = false;
    var complete = false;
  
    /**
     * @protected 
     * @param {Number} count
     * @return {Boolean}
     */
    this.count = function(count){
        application.output("COUNT",LOGGINGLEVEL.INFO);
        if(cancelled){
            application.output("CANCELLED");
            return false;
        }
        currentCount = count;
        notify();
        return !cancelled;
    }
     
    /**
     * @protected 
     */
    this.end = function(){
        complete = !cancelled;
        application.output("END",LOGGINGLEVEL.INFO);
        notify();
    }
     
    /**
     * @protected 
     * @param {Number} op
     * @param {String} src
     * @param {String} dest
     * @param {Number} max
     */
    this.init = function(op, src, dest, max){
        progressMode = op;
        source = src;
        destination = dest;
        maxCount = max;
        application.output("INIT",LOGGINGLEVEL.INFO);
        notify();
    }
     
     
    /**
     * Notify listener
     * @private 
     */
    function notify(){
        if(callback){
            try{
                var progress = {
                    mode:progressMode,
                    count:currentCount,
                    max:maxCount,
                    src:source,
                    dest:destination,
                    isCancelled:cancelled,
                    isComplete:complete,
                    cancel:function(){cancelled=true;}
                }
                callback.apply(null,[progress]);
            }catch(e){
                application.output("Failed to callback: " + e.toString(),LOGGINGLEVEL.ERROR);
            }
        }
    }
}
