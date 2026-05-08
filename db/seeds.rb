demo = User.find_or_create_by!(email: "demo@mailzilla.com") do |u|
  u.name     = "Demo User"
  u.password = "demo1234"
end

# Segments
newsletter = Segment.find_or_create_by!(name: "Newsletter Subscribers", user: demo)
vip        = Segment.find_or_create_by!(name: "VIP Customers", user: demo)
leads      = Segment.find_or_create_by!(name: "New Leads", user: demo)

# Contacts
contacts_data = [
  { name: "Alice Johnson",   email: "alice@example.com" },
  { name: "Bob Smith",       email: "bob@example.com" },
  { name: "Carol Williams",  email: "carol@example.com" },
  { name: "David Brown",     email: "david@example.com" },
  { name: "Eva Martinez",    email: "eva@example.com" },
  { name: "Frank Lee",       email: "frank@example.com" },
  { name: "Grace Kim",       email: "grace@example.com" },
  { name: "Henry Davis",     email: "henry@example.com" },
  { name: "Iris Chen",       email: "iris@example.com" },
  { name: "Jack Wilson",     email: "jack@example.com" },
  { name: "Karen Taylor",    email: "karen@example.com" },
  { name: "Leo Anderson",    email: "leo@example.com" },
  { name: "Mia Thomas",      email: "mia@example.com" },
  { name: "Noah Jackson",    email: "noah@example.com" },
  { name: "Olivia White",    email: "olivia@example.com" },
  { name: "Paul Harris",     email: "paul@example.com" },
  { name: "Quinn Martin",    email: "quinn@example.com" },
  { name: "Rachel Garcia",   email: "rachel@example.com" },
  { name: "Sam Rodriguez",   email: "sam@example.com" },
  { name: "Tina Lewis",      email: "tina@example.com" },
  { name: "Uma Walker",      email: "uma@example.com" },
  { name: "Victor Hall",     email: "victor@example.com" },
  { name: "Wendy Allen",     email: "wendy@example.com" },
  { name: "Xander Young",    email: "xander@example.com" },
  { name: "Yara King",       email: "yara@example.com" },
]

contacts = contacts_data.map do |attrs|
  Contact.find_or_create_by!(email: attrs[:email], user: demo) do |c|
    c.name = attrs[:name]
  end
end

# Assign contacts to segments
newsletter.contacts = contacts[0..19]
vip.contacts        = contacts[0..9]
leads.contacts      = contacts[10..24]

# Helper: build realistic campaign_contacts with stats
def seed_campaign(campaign, contacts, sent_at_offset_days)
  sent_at = sent_at_offset_days.days.ago
  campaign.update!(sent_at: sent_at, status: :sent)

  contacts.each_with_index do |contact, i|
    status = case i % 10
    when 0    then "bounce"
    when 1    then "spamreport"
    when 2, 3 then "click"
    when 4..6 then "open"
    else           "delivered"
    end

    open_at  = ["open", "click"].include?(status) ? sent_at + rand(1..48).hours : nil
    click_at = status == "click" ? open_at + rand(5..120).minutes : nil

    CampaignContact.find_or_create_by!(campaign: campaign, contact: contact) do |cc|
      cc.status       = status
      cc.delivered_at = sent_at + rand(1..10).minutes
      cc.open_at      = open_at
      cc.click_at     = click_at
    end
  end
end

# Campaign 1 — sent, good stats
c1 = Campaign.find_or_create_by!(name: "Spring Newsletter 2024", user: demo) do |c|
  c.subject    = "🌸 Spring deals just for you"
  c.from       = "hello@mailzilla.com"
  c.content    = "<h2>Spring is here!</h2><p>Check out our latest offers and updates for this season.</p>"
  c.status     = :sent
  c.segment    = newsletter
end
seed_campaign(c1, newsletter.contacts, 30)

# Campaign 2 — sent, VIP
c2 = Campaign.find_or_create_by!(name: "VIP Early Access", user: demo) do |c|
  c.subject    = "You're invited: exclusive early access"
  c.from       = "vip@mailzilla.com"
  c.content    = "<h2>VIP Access</h2><p>As one of our top customers, you get first access to our new features.</p>"
  c.status     = :sent
  c.segment    = vip
end
seed_campaign(c2, vip.contacts, 14)

# Campaign 3 — sent, leads
c3 = Campaign.find_or_create_by!(name: "Welcome to Mailzilla", user: demo) do |c|
  c.subject    = "Welcome! Here's how to get started"
  c.from       = "hello@mailzilla.com"
  c.content    = "<h2>Welcome aboard!</h2><p>We're thrilled to have you. Here's everything you need to get started.</p>"
  c.status     = :sent
  c.segment    = leads
end
seed_campaign(c3, leads.contacts, 7)

# Campaign 4 — draft
Campaign.find_or_create_by!(name: "Summer Product Launch", user: demo) do |c|
  c.subject = "Something big is coming this summer 🚀"
  c.from    = "hello@mailzilla.com"
  c.content = "<h2>Big announcement coming soon</h2><p>Stay tuned for something exciting.</p>"
  c.status  = :draft
  c.segment = newsletter
end

puts "Seeded: 1 demo user, #{contacts.length} contacts, 3 segments, 4 campaigns"
puts "Demo login: demo@mailzilla.com / demo1234"
