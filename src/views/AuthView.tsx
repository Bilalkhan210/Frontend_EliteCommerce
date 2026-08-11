import React, { useState } from 'react';
import { ViewMode, User } from '../types';

interface AuthViewProps {
  onNavigate: (view: ViewMode) => void;
  onLogin: (user: User, token: string) => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onNavigate, onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isRegister ? 'register' : 'login';
    const payload = isRegister ? { name, email, password } : { email, password };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        const loggedUser: User = {
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIGIh8kkDJkyfh6JOhJpTyzeYHQTkSQzi9QaEDfAPOcOUvfjNa4GHZ82j8gSqDdx1IvcfZEw7CBDjRc7Kn4S-BFDJjnW35Y1_R4erABJjEIbHvfdLqb3K_1hzYf8oLeGpJJLPyfm5IsTELCz7yb22v_V2VGOCrOROLK2hnRUgl-RAjdLYpTHD-pKBxMq8Zw4i6IHqpF3SpRtWsX0J6FSSc4q0gQc0_Yq0yaNNec3DC7sGLQ1MP-cjT',
        };

        onLogin(loggedUser, data.access_token);

        // Logic: admin@gmail.com goes to dashboard, others go to shop/home
        if (loggedUser.email === 'admin@gmail.com') {
          onNavigate('admin-overview');
        } else {
          onNavigate('home');
        }
      } else {
        setError(data.message || (data.errors ? Object.values(data.errors).flat()[0] : 'Invalid credentials'));
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#f7f9fb]">
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#191c1e] text-white p-12 flex-col justify-between overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdnHOmNUo2WCCiI4MiyRAzMq1JiBQ7HTj9twjC0Nfz-f19WNgij3aJ-B-rgePNpaE1y9byoqke1sTS3jLr6duOUWTOgM5kIkiaSen1YBYQwHi9pFYvCN0qb8SgpICl1Wx2Kzv4w1aKRSPw9V2V2Z0BesTCpj5Ndyw8TbVogobbBwZxbNAIJ7RvOh5LqGS6O3f7l89Aq5M8wShWFjlpnz6RXG89Gz4KGc0E3FZzY64-e9AbsklT0fC6')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10">
          <button onClick={() => onNavigate('home')} className="text-2xl font-extrabold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl">diamond</span>
            <span>EliteCommerce</span>
          </button>
        </div>
        <div className="relative z-10 max-w-lg">
          <blockquote className="text-2xl font-semibold leading-relaxed mb-4">
            "Experience premium shopping with our exclusive collection."
          </blockquote>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-[#c7c4d8] shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-extrabold text-[#191c1e]">
              {isRegister ? 'Join Us' : 'Welcome Back'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg font-semibold">
                {error}
              </div>
            )}

            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-[#c7c4d8] rounded-xl p-3 text-xs focus:border-[#3525cd] focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-[#c7c4d8] rounded-xl p-3 text-xs focus:border-[#3525cd] focus:outline-none"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-[#c7c4d8] rounded-xl p-3 text-xs focus:border-[#3525cd] focus:outline-none"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3525cd] hover:bg-[#4f46e5] text-white py-3.5 rounded-xl font-bold text-sm transition-all mt-4 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isRegister ? 'Register' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-gray-100 pt-4">
            <button
              onClick={() => { setIsRegister(!isRegister); setError(''); }}
              className="text-xs font-semibold text-[#3525cd] hover:underline"
            >
              {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
