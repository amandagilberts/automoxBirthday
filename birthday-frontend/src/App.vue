
<script setup lang="ts">
import { onMounted, ref } from "vue";

interface Birthday {
  id: string;
  name: string;
  date: string;
  message: string;
}

const birthdays = ref<Birthday[]>([]);
const loading = ref(false);
const submitting = ref(false);
const error = ref("");
const success = ref("");

const form = ref({
  name: "",
  birthday: "",
  message: "",
});

async function loadBirthdays() {
  loading.value = true;
  error.value = "";

  try {
    const response = await fetch("/api/birthdays");bi

    if (!response.ok) {
      throw new Error("Unable to load birthdays.");
    }

    const data = await response.json();
    birthdays.value = data.birthdays;
  } catch (err) {
    error.value =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred.";
  } finally {
    loading.value = false;
  }
}

async function submitBirthday() {
  submitting.value = true;
  error.value = "";
  success.value = "";
try {
  const response = await fetch("/api/birthdays", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: form.value.name,
      birthday: form.value.birthday,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Unable to submit the birthday.");
  }

  success.value = "Birthday submitted successfully.";

    form.value = {
      name: "",
      birthday: "",
      message: "",
    };

    await loadBirthdays();
  } catch (err) {
    error.value =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred.";
  } finally {
    submitting.value = false;
  }
}

onMounted(loadBirthdays);
</script>

<template>
  <main class="container">
    <header class="header">
      <div>
        <p class="eyebrow">BIRTHDAY MANAGEMENT</p>
        <h1>Birthday Messages</h1>
        <p class="subtitle">
          Manage upcoming birthdays and send thoughtful messages.
        </p>
      </div>

      <button class="secondary-button" @click="loadBirthdays">
        Refresh
      </button>
    </header>

    <section class="panel">
      <h2>Add a birthday</h2>

      <form @submit.prevent="submitBirthday">
        <label for="name">Name</label>
        <input
          id="name"
          v-model.trim="form.name"
          required
          placeholder="Enter a name"
        />

        <label for="date">Birthday</label>
        <input
          id="date"
          v-model="form.date"
          type="date"
          required
        />

        <label for="message">Message</label>
        <textarea
          id="message"
          v-model.trim="form.message"
          required
          rows="3"
          placeholder="Write a birthday message"
        />

        <button
          class="primary-button"
          type="submit"
          :disabled="submitting"
        >
          {{ submitting ? "Submitting..." : "Submit Birthday" }}
        </button>
      </form>

      <p v-if="success" class="success" role="status">
        {{ success }}
      </p>

      <p v-if="error" class="error" role="alert">
        {{ error }}
      </p>
    </section>

    <section class="birthday-section">
      <div class="section-heading">
        <h2>Saved Birthdays</h2>
        <span class="count">{{ birthdays.length }}</span>
      </div>

      <p v-if="loading" class="empty-state">
        Loading birthdays...
      </p>

      <p v-else-if="!error && birthdays.length === 0" class="empty-state">
        No birthdays found. Add one above to get started.
      </p>

      <div v-else-if="birthdays.length" class="birthday-list">
        <article
          v-for="birthday in birthdays"
          :key="birthday.id"
          class="birthday-card"
        >
          <div class="avatar">
            {{ birthday.name.charAt(0).toUpperCase() }}
          </div>

          <div class="birthday-details">
            <h3>{{ birthday.name }}</h3>
            <p class="date">{{ birthday.date }}</p>
            <p class="message">{{ birthday.message }}</p>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style>
:root {
  font-family: Inter, system-ui, -apple-system, sans-serif;
  color: #202938;
  background: #f5f7fb;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-width: 320px;
}

button,
input,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.container {
  width: min(900px, calc(100% - 32px));
  margin: 0 auto;
  padding: 48px 0;
}

.header,
.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.header {
  margin-bottom: 32px;
}

.eyebrow {
  color: #5265c9;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

h1 {
  margin: 8px 0;
  font-size: clamp(28px, 5vw, 38px);
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

.subtitle,
.date,
.message,
.empty-state {
  color: #687386;
}

.subtitle {
  line-height: 1.6;
}

.panel,
.birthday-card {
  background: white;
  border: 1px solid #e4e8f0;
  border-radius: 14px;
}

.panel {
  padding: 28px;
  margin-bottom: 36px;
  box-shadow: 0 5px 20px rgb(30 45 70 / 4%);
}

form {
  display: grid;
  gap: 10px;
}

label {
  margin-top: 8px;
  font-size: 14px;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #d8deea;
  border-radius: 8px;
  background: white;
  color: inherit;
}

input:focus,
textarea:focus {
  outline: 2px solid #b9c5ff;
  border-color: #5265c9;
}

textarea {
  resize: vertical;
}

.primary-button,
.secondary-button {
  padding: 11px 16px;
  border-radius: 8px;
  font-weight: 600;
}

.primary-button {
  margin-top: 12px;
  color: white;
  background: #465ac5;
  border: 1px solid #465ac5;
}

.primary-button:hover {
  background: #3548ad;
}

.secondary-button {
  background: white;
  color: #3548ad;
  border: 1px solid #d8deea;
}

.success {
  color: #18794e;
}

.error {
  color: #b42318;
}

.birthday-section {
  margin-top: 12px;
}

.count {
  padding: 4px 10px;
  border-radius: 20px;
  background: #e8ecff;
  color: #3548ad;
  font-weight: 600;
}

.birthday-list {
  display: grid;
  gap: 12px;
}

.birthday-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
}

.avatar {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #e8ecff;
  color: #3548ad;
  font-weight: 700;
}

.birthday-details h3 {
  margin: 0 0 6px;
}

.birthday-details p {
  margin: 4px 0;
  overflow-wrap: anywhere;
}

.empty-state {
  padding: 24px;
  text-align: center;
  background: white;
  border: 1px dashed #d8deea;
  border-radius: 12px;
}

@media (max-width: 600px) {
  .container {
    padding: 28px 0;
  }

  .panel {
    padding: 20px;
  }

  .header {
    align-items: flex-start;
  }
}
</style>
