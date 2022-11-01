import { useState } from "react";

const DEFAULT_DATA = {
  title: "",
  description: "",
  link: "",
  priority: 2,
  timeToFinish: 60,
};

const ResourceForm = ({ onFormSubmit, initialData }) => {
  const [form, setForm] = useState(initialData || DEFAULT_DATA);

  const submitForm = () => {
    onFormSubmit(form);
  };

  const resetForm = () => setForm(DEFAULT_DATA);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  return (
    <div className="resource-form">
      <h1 className="title">Add New Resource</h1>
      <form>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              name="title"
              value={form.title}
              onChange={handleInputChange}
              className="input"
              type="text"
              placeholder="Learn Nextjs and Sanity IO"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Description</label>
          <div className="control">
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              className="textarea"
              placeholder="Learn these technologies because they are very popular and enable better SEO!"
            ></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label">Link</label>
          <div className="control">
            <input
              name="link"
              value={form.link}
              onChange={handleInputChange}
              className="input"
              type="text"
              placeholder="https://www.example.com"
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Priority</label>
          <div className="control">
            <div className="select">
              <select
                name="priority"
                value={form.priority}
                onChange={handleInputChange}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Time to Finish</label>
          <div className="control">
            <input
              name="timeToFinish"
              value={form.timeToFinish}
              onChange={handleInputChange}
              className="input"
              type="number"
            />
            <p className="help">Time in Minutes</p>
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              type="button"
              className="button is-link"
              onClick={submitForm}
            >
              Submit
            </button>
          </div>
          <div className="control">
            <button
              type="button"
              onClick={resetForm}
              className="button is-link is-light"
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResourceForm;
