class User < ApplicationRecord
  has_secure_password
  validates :email, uniqueness: { case_sensitive: false }

  has_many :contacts
  has_many :segments

  def as_json(_options = nil)
    {
      id: id,
      name: name,
      email: email,
      created_at: created_at,
      segments: segments.map { |segment|
        {
          id: segment.id,
          name: segment.name
        }
      },
    }
  end
end
