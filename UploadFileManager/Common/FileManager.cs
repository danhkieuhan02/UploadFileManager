
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace UploadFileManager.Common
{
	public class FileManager
	{
		protected string _rootPath;
		public string _command;
		public string _value;
		// Duoc dung trong truong hop can doi ten/di chuyen file
		public string _secondaryValue;

		public FileManager(string rootPath, HttpRequest request)
		{
			_rootPath = rootPath;
			_command = request.Query["cmd"].ToString();
			_value = request.Query["value"].ToString();
			_secondaryValue = request.Query["secondaryValue"].ToString();
		}

		public FileManagerResponse ExcueteCmd()
		{
			FileManagerResponse response = new();
			try
			{

			switch(_command)
			{
				case "GET_ALL_DIR":
					{
							response.Data = GetAllDirs();
						break;
					}
				default:
					break;
				}

			}
			catch (Exception ex) {
				response.Success = false;
				response.Message = ex.Message;
				response.Data = null;
			}
			return response;
		}

		//Dir = directory
		public string[] GetAllDirs()
		{
			var dirs = Directory.GetDirectories(_rootPath, "*", SearchOption.AllDirectories);

			for(int i = 0; i<dirs.Length; i++)
			{
				dirs[i] = dirs[i].Replace(_rootPath, string.Empty).Trim(Path.DirectorySeparatorChar);
			}
			return dirs.OrderBy(d => d).ToArray(); 
		}
	}

	public class FileManagerResponse
	{
		public bool Success { get; set; } = true; //gia tri mac dinh no la true
		public string ?Message { get; set; }
		public object ?Data { get; set; }
	}
}
