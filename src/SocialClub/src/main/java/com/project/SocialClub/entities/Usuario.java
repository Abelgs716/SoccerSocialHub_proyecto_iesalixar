package com.project.SocialClub.entities;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import jakarta.persistence.*;
import jakarta.transaction.Transactional;


@Entity
public class Usuario implements UserDetails {
	  private static final long serialVersionUID = 1L;
	  	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer id;
	    private String name;
	    @Column(unique = true)
	    private String email;
	    private String password;

	    @ElementCollection(fetch = FetchType.EAGER, targetClass = Role.class)
	    @Enumerated(EnumType.STRING)
	    @CollectionTable(name="usuario_rol")
	    @Column(name ="RolesUsuario")
	    private Set<Role> roles = new HashSet<>();


	    @Transactional
	    @Override
	    public Collection<? extends GrantedAuthority> getAuthorities() {
	        // Cargar la colección de roles de manera temprana
	        roles.size(); // Esto carga la colección de roles

	        return roles.stream()
	                .map(role -> new SimpleGrantedAuthority(role.name()))
	                .collect(Collectors.toList());
	    }
	   

	    @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isEnabled() {
	        return true;
	    }

	    @Override
	    public String getPassword() {
	        return password;
	    }

	    // Métodos setter añadidos
	    public void setFirstName(String name) {
	        this.name = name;
	    }


	    public void setEmail(String email) {
	        this.email = email;
	    }

	    public void setPassword(String password) {
	        this.password = password;
	    }

	    public Set<Role> getRoles() {
	        return roles;
	    }

	    public void setRoles(Set<Role> roles) {
	        this.roles = roles;
	    }
		public Integer getId() {
			return id;
		}
		public String getFirstName() {
			return name;
		}
	
		public String getEmail() {
			return email;
		}


		public String getName() {
			return name;
		}


		public void setName(String name) {
			this.name = name;
		}


		@Override
		public String getUsername() {
			// TODO Auto-generated method stub
			return null;
		}


		
	    
	    
}
