import { useState } from "react"
import { Link } from "react-router-dom"

import Button from "../components/Button"
import PageHeader from "../components/PageHeader"


function AddDrive() {
  const [hiringRounds, setHiringRounds] = useState([
    {
      id: 1,
      round: "",
      description: "",
    },
  ])

  const [jdFile, setJdFile] = useState(null)


  const addHiringRound = () => {
    setHiringRounds((currentRounds) => [
      ...currentRounds,
      {
        id: Date.now(),
        round: "",
        description: "",
      },
    ])
  }


  const removeHiringRound = (id) => {
    setHiringRounds((currentRounds) =>
      currentRounds.filter((round) => round.id !== id)
    )
  }


  const updateHiringRound = (id, field, value) => {
    setHiringRounds((currentRounds) =>
      currentRounds.map((round) =>
        round.id === id
          ? { ...round, [field]: value }
          : round
      )
    )
  }


  const handleFileChange = (event) => {
    const file = event.target.files?.[0]

    if (file) {
      setJdFile(file)
    }
  }


  const handleSubmit = (event) => {
    event.preventDefault()

    /*
     * Backend submission will be connected here.
     *
     * Future flow:
     *
     * POST /api/jobs
     *        ↓
     * Coordinator submits drive
     *        ↓
     * Backend creates the drive
     *        ↓
     * Status = PENDING
     *        ↓
     * Admin receives notification
     *        ↓
     * Admin approves/rejects
     *        ↓
     * Approved drive becomes visible to students
     *
     * If JD upload is required, the file will be sent
     * using multipart/form-data through the backend.
     */
  }


  return (
    <main className="min-h-screen bg-[#FAF8F5]">

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">

        <PageHeader
          title="Add Drive"
          description="Create a placement drive and submit it for administrator approval."
        />


        {/* Approval Notice */}
        <div className="mb-8 flex gap-4 rounded-2xl border border-[#E8DDBF] bg-[#FFF9EA] p-5">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8EBC7] text-sm font-bold text-[#A87500]">
            !
          </div>

          <div>

            <h2 className="font-semibold text-[#242424]">
              Admin approval required
            </h2>

            <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
              Submitted drives will remain pending until an administrator
              reviews and approves them. Only approved drives will be
              published to students.
            </p>

          </div>

        </div>


        <form onSubmit={handleSubmit} className="space-y-8">


          {/* Basic Information */}
          <FormSection
            title="Basic Information"
            description="Enter the primary details of the placement opportunity."
          >

            <div className="grid gap-5 md:grid-cols-2">

              <FormField
                label="Job Title"
                name="title"
                placeholder="e.g. Software Developer"
                required
              />

              <FormField
                label="Company Name"
                name="company"
                placeholder="e.g. ABC Technologies"
                required
              />

              <FormField
                label="Location"
                name="location"
                placeholder="e.g. Hyderabad / Remote"
                required
              />

              <FormField
                label="Job Type"
                name="jobType"
                type="select"
                required
                options={[
                  "Select job type",
                  "Full Time",
                  "Part Time",
                  "Internship",
                  "Contract",
                ]}
              />

              <FormField
                label="Category"
                name="category"
                type="select"
                required
                options={[
                  "Select category",
                  "Technical",
                  "Non-Technical",
                  "Internal",
                ]}
              />

              <FormField
                label="Package / Compensation"
                name="package"
                placeholder="e.g. ₹6 LPA"
                required
              />

              <FormField
                label="Application Deadline"
                name="deadline"
                type="datetime-local"
                required
              />

              <FormField
                label="Application Link"
                name="applicationLink"
                type="url"
                placeholder="https://..."
              />

            </div>

          </FormSection>


          {/* Eligibility */}
          <FormSection
            title="Eligibility Criteria"
            description="Define the academic requirements for students."
          >

            <div className="grid gap-5 md:grid-cols-2">

              <FormField
                label="Qualification / Course"
                name="qualification"
                placeholder="e.g. B.Tech / BCA / MCA"
                required
              />

              <FormField
                label="Department"
                name="department"
                type="select"
                required
                options={[
                  "Select department",
                  "Computer Science",
                  "Information Technology",
                  "Electronics",
                  "Electrical",
                  "Mechanical",
                  "Civil",
                  "Other",
                ]}
              />

              <FormField
                label="Graduation Year"
                name="graduationYear"
                type="number"
                placeholder="e.g. 2027"
                required
              />

              <FormField
                label="Minimum CGPA / Percentage"
                name="cgpa"
                type="number"
                step="0.01"
                placeholder="e.g. 7.00"
                required
              />

              <FormField
                label="Maximum Backlogs"
                name="backlogs"
                type="number"
                min="0"
                placeholder="e.g. 0"
                required
              />

              <FormField
                label="Minimum Attendance"
                name="attendance"
                type="number"
                min="0"
                max="100"
                step="0.01"
                placeholder="e.g. 75"
              />

            </div>

            <div className="mt-5 rounded-xl border border-[#E7E1DB] bg-[#FAF8F5] p-4">

              <p className="text-xs font-semibold uppercase tracking-wide text-[#8A817A]">
                Eligibility note
              </p>

              <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
                Student eligibility will be calculated by the system using
                stored student information and the criteria provided here.
              </p>

            </div>

          </FormSection>


          {/* Skills */}
          <FormSection
            title="Skills & Requirements"
            description="Specify the skills and requirements expected from applicants."
          >

            <FormField
              label="Required Skills"
              name="skills"
              placeholder="e.g. Java, Spring Boot, SQL, React"
              required
            />

            <div className="mt-5">

              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-[#242424]"
              >
                Job Description / Additional Requirements
              </label>

              <textarea
                id="description"
                name="description"
                rows="6"
                placeholder="Describe the role, responsibilities and other requirements..."
                className="profile-input resize-y"
              />

            </div>

          </FormSection>


          {/* Hiring Process */}
          <FormSection
            title="Hiring Process"
            description="Add the selection rounds students will go through."
          >

            <div className="space-y-4">

              {hiringRounds.map((round, index) => (

                <div
                  key={round.id}
                  className="rounded-xl border border-[#E7E1DB] bg-[#FAF8F5] p-5"
                >

                  <div className="mb-4 flex items-center justify-between gap-4">

                    <h3 className="text-sm font-bold text-[#242424]">
                      Round {index + 1}
                    </h3>

                    {hiringRounds.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeHiringRound(round.id)}
                        className="text-xs font-semibold text-[#C0392B] hover:text-[#A93226]"
                      >
                        Remove
                      </button>
                    )}

                  </div>


                  <div className="grid gap-4 md:grid-cols-2">

                    <div>

                      <label
                        htmlFor={`round-${round.id}`}
                        className="mb-2 block text-sm font-semibold text-[#242424]"
                      >
                        Round Name
                      </label>

                      <input
                        id={`round-${round.id}`}
                        value={round.round}
                        onChange={(event) =>
                          updateHiringRound(
                            round.id,
                            "round",
                            event.target.value
                          )
                        }
                        placeholder="e.g. Technical Interview"
                        className="profile-input"
                      />

                    </div>


                    <div>

                      <label
                        htmlFor={`round-description-${round.id}`}
                        className="mb-2 block text-sm font-semibold text-[#242424]"
                      >
                        Description
                      </label>

                      <input
                        id={`round-description-${round.id}`}
                        value={round.description}
                        onChange={(event) =>
                          updateHiringRound(
                            round.id,
                            "description",
                            event.target.value
                          )
                        }
                        placeholder="Brief description of this round"
                        className="profile-input"
                      />

                    </div>

                  </div>

                </div>

              ))}

            </div>


            <button
              type="button"
              onClick={addHiringRound}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#7A1F3D] transition-colors hover:text-[#5C1730]"
            >
              <span className="text-lg">+</span>
              Add another round
            </button>

          </FormSection>


          {/* Job Description Upload */}
          <FormSection
            title="Job Description Document"
            description="Upload the official job description if one is available."
          >

            <label
              htmlFor="jdFile"
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#DCD3CC] bg-[#FAF8F5] px-6 py-10 text-center transition-colors hover:border-[#7A1F3D] hover:bg-[#FBF7F8]"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5E9ED] text-lg font-bold text-[#7A1F3D]">
                ↑
              </div>

              <p className="mt-4 text-sm font-bold text-[#242424]">
                Upload job description
              </p>

              <p className="mt-1 text-xs text-[#8A817A]">
                PDF, DOC or DOCX
              </p>

              {jdFile && (
                <p className="mt-4 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-[#7A1F3D]">
                  {jdFile.name}
                </p>
              )}

              <input
                id="jdFile"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />

            </label>

          </FormSection>


          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#E7E1DB] pt-6 sm:flex-row sm:justify-end">

            <Button
              variant="secondary"
              to="/coordinator/my-drives"
            >
              Cancel
            </Button>

            <Button type="submit">
              Submit Drive for Approval
            </Button>

          </div>


        </form>

      </div>

    </main>
  )
}


/* -------------------------------------------------
   Reusable local form components
------------------------------------------------- */

function FormSection({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-[#E7E1DB] bg-white p-6 shadow-[0_2px_10px_rgba(36,36,36,0.04)] sm:p-8">

      <div className="mb-6">

        <h2 className="text-lg font-bold text-[#242424]">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm leading-6 text-[#6B6B6B]">
            {description}
          </p>
        )}

      </div>

      {children}

    </section>
  )
}


function FormField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  options = [],
  min,
  max,
  step,
}) {
  return (
    <div>

      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[#242424]"
      >
        {label}

        {required && (
          <span className="ml-1 text-[#C0392B]">
            *
          </span>
        )}
      </label>


      {type === "select" ? (

        <select
          id={name}
          name={name}
          required={required}
          className="profile-input"
          defaultValue=""
        >

          <option value="" disabled>
            {options[0] || "Select"}
          </option>

          {options.slice(1).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}

        </select>

      ) : (

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
          className="profile-input"
        />

      )}

    </div>
  )
}


export default AddDrive