import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    console.log('📦 AuthContext - Leyendo localStorage:', { savedToken, savedUser });

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        setIsAuthenticated(true);
        console.log('✅ Usuario restaurado:', JSON.parse(savedUser));
      } catch (error) {
        console.error('❌ Error parseando usuario:', error);
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (usuario, contrasea) => {
    try {
      const response = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario,
          contrasea
        }),
      });

      const data = await response.json();
      console.log('📡 Respuesta del backend:', data);

      if (data.success) {
        console.log('✅ Login exitoso. Usuario:', data.usuario);
        
        // Guardar en localStorage
        setUser(data.usuario);
        setToken(data.token);
        setIsAuthenticated(true);
        
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.usuario));
        
        console.log('💾 Guardado en localStorage:', { token: data.token, usuario: data.usuario });
        
        return { success: true, usuario: data.usuario };
      }

      console.warn('⚠️ Login falló:', data.message);
      return { success: false, message: data.message };
    } catch (error) {
      console.error('❌ Error en login:', error);
      return { success: false, message: 'Error de conexión' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('🚪 Logout exitoso');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
