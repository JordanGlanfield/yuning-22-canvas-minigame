import { vi, describe, beforeEach, it, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'

import TodoList from './TodoList.vue'
import { useTaskStore } from '@/stores/TaskStore'

describe('works with store', () => {
    let mountOptions

    // beforeEach lets you run a piece of code at the start of every individual test. It's a good
    // place to put setup code so that every test gets a clean slate and is configured correctly.
    beforeEach(() => {
        mountOptions = {
            // global is a key that lets you provide configuration for things like pinia and vue router
            global: {
                // plugins is like the testing equivalent of app.use() in main.js.
                plugins: [
                    createTestingPinia({
                        // It's possible to have multiple stores in pinia, so the way you give initialState
                        // is to use the names of the stores as keys. In this case, the name is the name
                        // you pass in to defineStore in TaskStore.js.
                        initialState: {
                            // Name of store
                            tasks: {
                                taskList: [
                                    {
                                        description: 'Take out the trash',
                                        dueDate: new Date(),
                                        id: 1,
                                        completion: false,
                                    }
                                ]
                            }
                        },
                        // Don't worry about this for now. It's used for mocking actions.
                        createSpy: vi.fn
                    })
                ]
            }
        }
    })

    it('fetches the current date on mount', () => {
        const taskStore = useTaskStore()

        expect(taskStore.dateOfToday).not.toHaveBeenCalled()

        const wrapper = mount(TodoList, {
            ...mountOptions
        })

        expect(taskStore.dateOfToday).toHaveBeenCalled()
        expect(wrapper.text().includes('Take out the trash')).toBe(true)
    })
})