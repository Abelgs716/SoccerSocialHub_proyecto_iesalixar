package com.project.SocialClub.dto.response.user;

public class UsuarioResponse {
	 private String name;
	    private String email;
	    private String rol;
	    

		public UsuarioResponse(String name, String email, String rol) {
			super();
			this.name = name;
			
			this.email = email;
			this.rol = rol;
		}

	

		public String getFirstName() {
			return name;
		}
		public void setFirstName(String name) {
			this.name = name;
		}
	
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getRol() {
			return rol;
		}
		public void setRol(String rol) {
			this.rol = rol;
		}
		
	    
	    
}
