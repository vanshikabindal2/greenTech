
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/quote')({
  component: QuotePage,
})

function QuotePage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setLoading(true)
    setMessage('')
    setSuccess(false)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: import.meta.env
              .VITE_WEB3FORMS_ACCESS_KEY,
            subject: 'New Quote Request - Green Tech',
            from_name: 'Green Tech Website',
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('description'),
          }),
        }
      )

      const result = await response.json()

      if (response.ok && result.success) {
        setSuccess(true)
        setMessage(
          'Your quote request has been submitted successfully!'
        )
        form.reset()
      } else {
        setMessage(
          result.message || 'Failed to submit. Please try again.'
        )
      }
    } catch {
      setMessage(
        'Network error. Please check your internet and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Get a Quote
        </h1>

        <p className="text-gray-600 mb-6">
          Please fill in your details and we will get back to you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email ID
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Requirement
            </label>
            <textarea
              name="description"
              rows={5}
              placeholder="Describe your requirement..."
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none"
            />
          </div>
           <div>
            <label className="block mb-2 font-medium">
            Description
            </label>
            <textarea
              name="description"
              rows={5}
              placeholder="description......."
              required
              className="w-full border border-gray-300 rounded-lg px-1 py-3 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7FB77E] text-white font-semibold py-3 rounded-lg hover:bg-[#6fa66d] disabled:opacity-60"
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>

          {message && (
            <p
              role="status"
              className={
                success ? 'text-green-700' : 'text-red-600'
              }
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default QuotePage


