import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Alert,
  Link as MuiLink,
  Modal,
  Stack
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); // État pour le modal d'inscription
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const navigate = useNavigate();
  const { login, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Email ou mot de passe invalide');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError('');
    setIsLoading(true);

    try {
      await signUp(signUpEmail, signUpPassword);
      setIsSignUpModalOpen(false); // Fermer le modal après l'inscription
      navigate('/');
    } catch (err) {
      setSignUpError("Une erreur s'est produite lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Activity size={32} color="#3f51b5" />
            <Typography component="h1" variant="h5" sx={{ ml: 1 }}>
              EpiTrack AI
            </Typography>
          </Box>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            Plateforme de gestion des épidémies
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  Se souvenir de moi
                </Typography>
              </Box>
              <MuiLink href="#" variant="body2" color="primary">
                Mot de passe oublié ?
              </MuiLink>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  Se connecter
                </>
              )}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Pas encore de compte ?{' '}
              <MuiLink
                component="button"
                variant="body2"
                color="primary"
                onClick={() => setIsSignUpModalOpen(true)}
              >
                S'inscrire
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Modal d'inscription */}
      <Modal
        open={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        aria-labelledby="modal-signup-title"
        aria-describedby="modal-signup-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-signup-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            <UserPlus size={24} className="mr-2" />
            S'inscrire
          </Typography>
          {signUpError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {signUpError}
            </Alert>
          )}
          <Box component="form" onSubmit={handleSignUpSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                required
                fullWidth
                id="name"
                label="Nom complet"
                name="email"
                autoComplete="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
              <TextField
                required
                fullWidth
                id="signup-email"
                label="Adresse email"
                name="email"
                autoComplete="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
              <TextField
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="signup-password"
                autoComplete="new-password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  "S'inscrire"
                )}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Login;