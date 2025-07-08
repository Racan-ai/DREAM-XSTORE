import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    email: string;
    username: string;
    lastName: string;
    bio: string;
    isBrand?: boolean;
    hero_image?: string;
  };
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, currentUser }) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: currentUser?.email || '',
    username: currentUser?.username || '',
    lastName: currentUser?.lastName || '',
    bio: currentUser?.bio || '',
    hero_image: currentUser?.hero_image || '',
  });

  // Add useEffect to update formData when currentUser changes
  useEffect(() => {
    const baseFormData = {
      email: currentUser.email || '',
      username: currentUser.username || '',
      lastName: currentUser.lastName || '',
      bio: currentUser.bio || '',
    };

    if (currentUser.isBrand) {
      setFormData({
        ...baseFormData,
        hero_image: currentUser.hero_image || '',
      });
    } else {
      setFormData({
        ...baseFormData,
        hero_image: '',
      });
    }
  }, [currentUser]);

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [pickupData, setPickupData] = useState({
    pickup_location: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    address_2: '',
    city: '',
    state: '',
    country: '',
    pin_code: ''
  });
  const [pickupError, setPickupError] = useState('');
  const [pickupSuccess, setPickupSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickupData({
      ...pickupData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Save to dreamx_user for consistency
      localStorage.setItem('dreamx_user', JSON.stringify(formData));
      setSuccess('Profile updated successfully!');
      window.dispatchEvent(new Event('storage'));
      setTimeout(() => {
        setSuccess('');
        onClose();
      }, 2000);
    } catch (err) {
      setError('An error occurred while updating profile');
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // Simulate password update
    setSuccess('Password updated successfully!');
    setTimeout(() => {
      setSuccess('');
      setIsPasswordModalOpen(false);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {!isPasswordModalOpen ? (
          <>
            <h2 className="text-2xl text-black font-bold mb-6">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full text-black  rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  maxLength={300}
                  className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                <div className="text-xs text-gray-500 text-right">
                  {formData.bio.length}/300 characters
                </div>
              </div>
              {currentUser.isBrand && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Hero Banner Image
                    <span className="text-xs text-gray-500 ml-1">(Recommended: 1920x1080)</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setHeroImage(e.target.files?.[0] || null)}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-purple-50 file:text-purple-700
                      hover:file:bg-purple-100"
                  />
                  {formData.hero_image && !heroImage && (
                    <p className="text-sm text-gray-500 mt-1">
                      Current banner image is set
                    </p>
                  )}
                </div>
              )}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <div className="flex justify-between gap-2 mt-6">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200"
                >
                  Change Password
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full text-black  rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full text-black  rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="mt-1 block w-full text-black  rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {success && <p className="text-green-500 text-sm">{success}</p>}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-black rounded-lg hover:bg-gray-200"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Update Password
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditProfileModal;
