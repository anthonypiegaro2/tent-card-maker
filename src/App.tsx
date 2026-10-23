import { Header } from "@/components/app/header"
import { PrintCards } from "@/components/app/print-cards"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import { Plus, Trash2 } from "lucide-react"

type Person = {
  name: string
  title: string
  department: string
}

const createEmptyPerson = (): Person => ({
  name: "",
  title: "",
  department: "",
})

function App() {
  const form = useForm({
    defaultValues: {
      people: [createEmptyPerson()],
    },
    onSubmit: ({ value }) => {
      console.log(value.people)
    },
  })

  return (
    <div className="min-h-dvh w-full">
      <div className="mx-auto min-h-dvh w-full border-x xl:max-w-6xl 2xl:max-w-[1380px]">
        <Header />

        <main className="mx-auto w-full max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Add cards
            </h1>
          </div>

          <form
            className="space-y-5"
            onSubmit={(event) => {
              event.preventDefault()
              event.stopPropagation()
              void form.handleSubmit()
            }}
          >
            <div className="overflow-hidden rounded-xl border bg-card">
              <div className="border-b px-4 py-3 sm:px-5">
                <h2 className="text-sm font-medium">People</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left">
                  <thead className="bg-muted/50">
                    <tr className="text-xs font-medium text-muted-foreground">
                      <th scope="col" className="px-4 py-3 sm:px-5">Name</th>
                      <th scope="col" className="px-4 py-3 sm:px-5">Title</th>
                      <th scope="col" className="px-4 py-3 sm:px-5">Department</th>
                      <th scope="col" className="w-14 px-4 py-3 sm:px-5">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <form.Field name="people" mode="array">
                      {(field) => (
                        <>
                          {field.state.value.map((_, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 sm:px-5">
                                <form.Field name={`people[${index}].name`}>
                                  {(inputField) => (
                                    <Input
                                      aria-label={`Name, row ${index + 1}`}
                                      autoComplete="off"
                                      placeholder="Name"
                                      value={inputField.state.value}
                                      onBlur={inputField.handleBlur}
                                      onChange={(event) =>
                                        inputField.handleChange(event.target.value)
                                      }
                                    />
                                  )}
                                </form.Field>
                              </td>
                              <td className="px-4 py-3 sm:px-5">
                                <form.Field name={`people[${index}].title`}>
                                  {(inputField) => (
                                    <Input
                                      aria-label={`Title, row ${index + 1}`}
                                      autoComplete="off"
                                      placeholder="Title"
                                      value={inputField.state.value}
                                      onBlur={inputField.handleBlur}
                                      onChange={(event) =>
                                        inputField.handleChange(event.target.value)
                                      }
                                    />
                                  )}
                                </form.Field>
                              </td>
                              <td className="px-4 py-3 sm:px-5">
                                <form.Field name={`people[${index}].department`}>
                                  {(inputField) => (
                                    <Input
                                      aria-label={`Department, row ${index + 1}`}
                                      autoComplete="off"
                                      placeholder="Department"
                                      value={inputField.state.value}
                                      onBlur={inputField.handleBlur}
                                      onChange={(event) =>
                                        inputField.handleChange(event.target.value)
                                      }
                                    />
                                  )}
                                </form.Field>
                              </td>
                              <td className="px-4 py-3 sm:px-5">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  aria-label={`Remove row ${index + 1}`}
                                  onClick={() => field.removeValue(index)}
                                  className="text-muted-foreground hover:border-destructive! hover:bg-destructive/60! hover:text-background/80! dark:hover:text-muted-foreground!"
                                >
                                  <Trash2 aria-hidden="true" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </form.Field>
                  </tbody>
                </table>
              </div>

              <div className="border-t px-4 py-3 sm:px-5">
                <form.Field name="people" mode="array">
                  {(field) => (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => field.pushValue(createEmptyPerson())}
                    >
                      <Plus aria-hidden="true" />
                      Add card
                    </Button>
                  )}
                </form.Field>
              </div>
            </div>

            <div className="flex justify-end">
              <form.Subscribe
                selector={(state) =>
                  [state.canSubmit, state.values.people] as const
                }
              >
                {([canSubmit, people]) => (
                  <PrintCards cards={people} canSubmit={canSubmit} />
                )}
              </form.Subscribe>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

export default App
