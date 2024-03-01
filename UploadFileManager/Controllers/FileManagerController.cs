﻿using Microsoft.AspNetCore.Mvc;
using UploadFileManager.Common;

namespace UploadFileManager.Controllers
{
	[ApiController]
	[Route("filemanager")]
	public class FileManagerController : Controller
	{
		FileManager _fm;
		public FileManagerController(IWebHostEnvironment env)
		{

			//lay duong dan tu thu muc wwwroot 
			var wwwroot = env.WebRootPath;
	
			//lay duong dan tu thu muc upload 
			var uploadPath = Path.Combine(wwwroot, "upload");
			_fm = new FileManager(uploadPath);
		}

		[Route("getalldir")]
		
		public string[] GetAllDirs()
		{
			return _fm.GetAllDirs();
		}
	}
}
