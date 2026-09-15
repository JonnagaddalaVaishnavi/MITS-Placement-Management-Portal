import { useState } from "react"

import Button from "../components/Button"
import EmptyState from "../components/EmptyState"
import LoadingState from "../components/LoadingState"
import PageHeader from "../components/PageHeader"
import StatusBadge from "../components/StatusBadge"

function StudentProfile() {
  const [activeTab, setActiveTab] = useState("Personal Info")
  const [loading] = useState(false)
  const [saved, setSaved] = useState(false)

  /*
   * Backend integration will provide the authenticated student's profile.
   *
   * Expected future API:
   * GET /api/students/me
   * PUT /api/students/me
   *
   * Supporting data will eventually come from:
   * Education
   * Projects
   * Experiences
   * Certificates
   * Documents
   * Attendance
   */

  const profile = null

  const tabs = [
    "Personal Info",
    "Education",
    "Projects",
    "Experiences",
    "Certificates",
    "Documents",
  ]

  const handleSave = () => {
    /*
     * Backend save + Admin verification notification
     * will be connected here.
     */
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F5]">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
          <LoadingState message="Loading your profile..." />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">

        <PageHeader
          title="My Profile"
          description="Maintain your placement profile and keep your academic and career information up to date."
        />


        {/* Verification Notice */}
        <section className="mb-8 rounded-2xl border border-[#E8D7A5] bg-[#FFF9E8] p-5 sm:p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex gap-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8E8B5] font-bold text-[#A87500]">
                !
              </div>

              <div>
                <p className="font-semibold text-[#242424]">
                  Profile verification
                </p>

                <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
                  Your profile information will be reviewed by the
                  administration before you can apply for placement drives.
                </p>
              </div>

            </div>

            <StatusBadge
              status={profile?.verificationStatus || "Not Verified"}
            />

          </div>

        </section>


        {/* Profile Layout */}
        <div className="overflow-hidden rounded-2xl border border-[#E7E1DB] bg-white shadow-[0_4px_20px_rgba(36,36,36,0.04)]">

          {/* Profile Header */}
          <div className="border-b border-[#E7E1DB] p-6 sm:p-8">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#F5E9ED] text-2xl font-bold text-[#7A1F3D]">
                {profile?.name?.charAt(0)?.toUpperCase() || "S"}
              </div>

              <div className="min-w-0">

                <h2 className="text-xl font-bold text-[#242424]">
                  {profile?.name || "Student Profile"}
                </h2>

                <p className="mt-1 text-sm text-[#6B6B6B]">
                  {profile?.rollNumber || "Complete your profile information"}
                </p>

                {profile?.department && (
                  <p className="mt-1 text-sm text-[#8A817A]">
                    {profile.department}
                  </p>
                )}

              </div>

            </div>

          </div>


          {/* Tabs */}
          <div className="border-b border-[#E7E1DB] px-4 sm:px-6">

            <div className="flex gap-1 overflow-x-auto">

              {tabs.map((tab) => {
                const active = activeTab === tab

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`
                      relative shrink-0 px-4 py-4 text-sm font-semibold transition-colors
                      ${
                        active
                          ? "text-[#7A1F3D]"
                          : "text-[#6B6B6B] hover:text-[#7A1F3D]"
                      }
                    `}
                  >
                    {tab}

                    {active && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#7A1F3D]" />
                    )}
                  </button>
                )
              })}

            </div>

          </div>


          {/* Tab Content */}
          <div className="p-6 sm:p-8">

            {activeTab === "Personal Info" && (
              <PersonalInfo profile={profile} />
            )}

            {activeTab === "Education" && (
              <EducationSection profile={profile} />
            )}

            {activeTab === "Projects" && (
              <ProjectsSection profile={profile} />
            )}

            {activeTab === "Experiences" && (
              <ExperienceSection profile={profile} />
            )}

            {activeTab === "Certificates" && (
              <CertificatesSection profile={profile} />
            )}

            {activeTab === "Documents" && (
              <DocumentsSection profile={profile} />
            )}

          </div>


          {/* Save Footer */}
          <div className="flex flex-col gap-4 border-t border-[#E7E1DB] bg-[#FCFAF8] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">

            <div>
              {saved ? (
                <p className="text-sm font-medium text-[#198754]">
                  Changes saved successfully.
                </p>
              ) : (
                <p className="text-sm text-[#6B6B6B]">
                  Save your changes to submit the profile for verification.
                </p>
              )}
            </div>

            <Button onClick={handleSave}>
              Save Changes
            </Button>

          </div>

        </div>

      </div>
    </main>
  )
}


/* =========================================================
   PERSONAL INFORMATION
   ========================================================= */

function PersonalInfo({ profile }) {
  return (
    <ProfileSection
      title="Personal Information"
      description="Basic information associated with your university placement profile."
    >

      <div className="grid gap-5 md:grid-cols-2">

        <ProfileField
          label="Full Name"
          value={profile?.name}
          placeholder="Enter your full name"
        />

        <ProfileField
          label="Email"
          value={profile?.email}
          placeholder="Your registered email"
          readOnly
        />

        <ProfileField
          label="Roll Number"
          value={profile?.rollNumber}
          placeholder="Your university roll number"
          readOnly
        />

        <ProfileField
          label="Gender"
          value={profile?.gender}
          placeholder="Select gender"
          type="select"
          options={[
            "Male",
            "Female",
            "Other",
            "Prefer not to say",
          ]}
        />

        <ProfileField
          label="Mobile Number"
          value={profile?.mobile}
          placeholder="Enter mobile number"
        />

        <ProfileField
          label="WhatsApp Number"
          value={profile?.whatsapp}
          placeholder="Enter WhatsApp number"
        />

        <ProfileField
          label="Date of Birth"
          value={profile?.dateOfBirth}
          type="date"
        />

        <ProfileField
          label="Guardian Mobile"
          value={profile?.guardianMobile}
          placeholder="Enter guardian mobile number"
        />

        <ProfileField
          label="LinkedIn"
          value={profile?.linkedin}
          placeholder="LinkedIn profile URL"
        />

        <ProfileField
          label="Instagram"
          value={profile?.instagram}
          placeholder="Instagram profile URL"
        />

        <ProfileField
          label="Current State"
          value={profile?.currentState}
          placeholder="Enter current state"
        />

        <ProfileField
          label="Current City"
          value={profile?.currentCity}
          placeholder="Enter current city"
        />

        <ProfileField
          label="Native State"
          value={profile?.nativeState}
          placeholder="Enter native state"
        />

      </div>


      <div className="mt-8 border-t border-[#F0EBE7] pt-8">

        <h3 className="text-base font-bold text-[#242424]">
          Skills & Interests
        </h3>

        <p className="mt-1 text-sm text-[#6B6B6B]">
          Add information that can help recruiters understand your profile.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-2">

          <ProfileField
            label="Skills"
            value={profile?.skills}
            placeholder="Java, React, SQL..."
          />

          <ProfileField
            label="Hobbies"
            value={profile?.hobbies}
            placeholder="Enter your hobbies"
          />

          <ProfileField
            label="Languages"
            value={profile?.languages}
            placeholder="English, Hindi..."
          />

        </div>

      </div>

    </ProfileSection>
  )
}


/* =========================================================
   EDUCATION
   ========================================================= */

function EducationSection({ profile }) {
  const education = profile?.education || []

  if (education.length === 0) {
    return (
      <ProfileSection
        title="Education"
        description="Maintain your academic qualifications and placement-related academic information."
      >
        <EmptyState
          title="No education details"
          description="Your academic records will appear here once they are available."
        />
      </ProfileSection>
    )
  }

  return (
    <ProfileSection
      title="Education"
      description="Maintain your academic qualifications and placement-related academic information."
    >

      <div className="space-y-5">

        {education.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-[#E7E1DB] p-5"
          >
            <div className="grid gap-5 md:grid-cols-2">

              <ProfileField
                label="Qualification"
                value={item.qualification}
                placeholder="Qualification"
              />

              <ProfileField
                label="Institution"
                value={item.institution}
                placeholder="Institution"
              />

              <ProfileField
                label="Department / Course"
                value={item.department}
                placeholder="Department"
              />

              <ProfileField
                label="Graduation Year"
                value={item.graduationYear}
                placeholder="Year"
              />

              <ProfileField
                label="CGPA / Percentage"
                value={item.cgpa}
                placeholder="CGPA or percentage"
              />

              <ProfileField
                label="Backlogs"
                value={item.backlogs}
                placeholder="Number of backlogs"
              />

            </div>
          </div>
        ))}

      </div>

    </ProfileSection>
  )
}


/* =========================================================
   PROJECTS
   ========================================================= */

function ProjectsSection({ profile }) {
  const projects = profile?.projects || []

  if (projects.length === 0) {
    return (
      <ProfileSection
        title="Projects"
        description="Showcase academic, personal or placement-related projects."
      >
        <EmptyState
          title="No projects added"
          description="Projects you add to your placement profile will appear here."
        />
      </ProfileSection>
    )
  }

  return (
    <ProfileSection
      title="Projects"
      description="Showcase academic, personal or placement-related projects."
    >

      <div className="space-y-5">

        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border border-[#E7E1DB] p-5"
          >

            <div className="grid gap-5">

              <ProfileField
                label="Project Title"
                value={project.title}
                placeholder="Project title"
              />

              <ProfileTextarea
                label="Description"
                value={project.description}
                placeholder="Describe your project"
              />

              <ProfileField
                label="Technologies"
                value={project.technologies}
                placeholder="Technologies used"
              />

              {project.link && (
                <ProfileField
                  label="Project Link"
                  value={project.link}
                  placeholder="GitHub / project URL"
                />
              )}

            </div>

          </div>
        ))}

      </div>

    </ProfileSection>
  )
}


/* =========================================================
   EXPERIENCES
   ========================================================= */

function ExperienceSection({ profile }) {
  const experiences = profile?.experiences || []

  if (experiences.length === 0) {
    return (
      <ProfileSection
        title="Experiences"
        description="Add internships, work experience and other relevant professional experience."
      >
        <EmptyState
          title="No experiences added"
          description="Your internships and professional experiences will appear here."
        />
      </ProfileSection>
    )
  }

  return (
    <ProfileSection
      title="Experiences"
      description="Add internships, work experience and other relevant professional experience."
    >

      <div className="space-y-5">

        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="rounded-xl border border-[#E7E1DB] p-5"
          >

            <div className="grid gap-5 md:grid-cols-2">

              <ProfileField
                label="Organization"
                value={experience.organization}
                placeholder="Organization"
              />

              <ProfileField
                label="Role"
                value={experience.role}
                placeholder="Role / position"
              />

              <ProfileField
                label="Start Date"
                value={experience.startDate}
                type="date"
              />

              <ProfileField
                label="End Date"
                value={experience.endDate}
                type="date"
              />

            </div>

            <div className="mt-5">
              <ProfileTextarea
                label="Description"
                value={experience.description}
                placeholder="Describe your responsibilities and achievements"
              />
            </div>

          </div>
        ))}

      </div>

    </ProfileSection>
  )
}


/* =========================================================
   CERTIFICATES
   ========================================================= */

function CertificatesSection({ profile }) {
  const certificates = profile?.certificates || []

  if (certificates.length === 0) {
    return (
      <ProfileSection
        title="Certificates"
        description="Keep track of certifications and relevant credentials."
      >
        <EmptyState
          title="No certificates added"
          description="Your certificates will appear here once added to your profile."
        />
      </ProfileSection>
    )
  }

  return (
    <ProfileSection
      title="Certificates"
      description="Keep track of certifications and relevant credentials."
    >

      <div className="space-y-4">

        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="flex flex-col gap-4 rounded-xl border border-[#E7E1DB] p-5 sm:flex-row sm:items-center sm:justify-between"
          >

            <div>
              <h3 className="font-semibold text-[#242424]">
                {certificate.name}
              </h3>

              <p className="mt-1 text-sm text-[#6B6B6B]">
                {certificate.issuer}
              </p>

              {certificate.date && (
                <p className="mt-1 text-xs text-[#8A817A]">
                  {certificate.date}
                </p>
              )}
            </div>

            {certificate.status && (
              <StatusBadge status={certificate.status} />
            )}

          </div>
        ))}

      </div>

    </ProfileSection>
  )
}


/* =========================================================
   DOCUMENTS
   ========================================================= */

function DocumentsSection({ profile }) {
  const documents = profile?.documents || []

  return (
    <ProfileSection
      title="Documents"
      description="Manage your resume and placement-related documents."
    >

      {/* Upload Area */}
      <div className="rounded-2xl border border-dashed border-[#D8CFC8] bg-[#FCFAF8] p-6 text-center">

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5E9ED] text-lg text-[#7A1F3D]">
          ↑
        </div>

        <h3 className="mt-4 font-semibold text-[#242424]">
          Upload a document
        </h3>

        <p className="mt-1 text-sm text-[#6B6B6B]">
          PDF, DOC or DOCX files can be uploaded.
        </p>

        <label className="mt-5 inline-flex cursor-pointer items-center justify-center rounded-lg border border-[#7A1F3D] bg-transparent px-5 py-3 text-sm font-semibold text-[#7A1F3D] transition-all hover:bg-[#7A1F3D] hover:text-white">

          Choose File

          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
          />

        </label>

      </div>


      {/* Existing Documents */}
      {documents.length > 0 ? (

        <div className="mt-6 space-y-3">

          {documents.map((document) => (
            <div
              key={document.id}
              className="flex flex-col gap-4 rounded-xl border border-[#E7E1DB] p-4 sm:flex-row sm:items-center sm:justify-between"
            >

              <div>
                <p className="font-semibold text-[#242424]">
                  {document.name}
                </p>

                <p className="mt-1 text-xs text-[#8A817A]">
                  {document.type}
                </p>
              </div>

              <StatusBadge
                status={document.status || "Pending"}
              />

            </div>
          ))}

        </div>

      ) : (

        <div className="mt-6">
          <EmptyState
            title="No documents uploaded"
            description="Your resume and other placement documents will appear here."
          />
        </div>

      )}

    </ProfileSection>
  )
}


/* =========================================================
   REUSABLE PROFILE COMPONENTS
   ========================================================= */

function ProfileSection({ title, description, children }) {
  return (
    <section>

      <div className="mb-7">
        <h2 className="text-xl font-bold text-[#242424]">
          {title}
        </h2>

        {description && (
          <p className="mt-1.5 text-sm leading-6 text-[#6B6B6B]">
            {description}
          </p>
        )}
      </div>

      {children}

    </section>
  )
}


function ProfileField({
  label,
  value,
  placeholder,
  type = "text",
  readOnly = false,
  options = [],
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#242424]">
        {label}
      </label>

      {type === "select" ? (

        <select
          defaultValue={value || ""}
          className="profile-input"
          disabled={readOnly}
        >
          <option value="">
            {placeholder || `Select ${label}`}
          </option>

          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

      ) : (

        <input
          type={type}
          defaultValue={value || ""}
          placeholder={placeholder}
          readOnly={readOnly}
          className={readOnly ? "profile-readonly" : "profile-input"}
        />

      )}
    </div>
  )
}


function ProfileTextarea({
  label,
  value,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#242424]">
        {label}
      </label>

      <textarea
        defaultValue={value || ""}
        placeholder={placeholder}
        rows={5}
        className="profile-input resize-y"
      />
    </div>
  )
}

export default StudentProfile