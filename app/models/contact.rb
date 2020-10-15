class Contact < ApplicationRecord
  has_and_belongs_to_many :segments
  has_many :campaign_contacts
  belongs_to :user

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
