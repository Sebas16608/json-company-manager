import { useState } from 'react'
import Notification from './components/Notification'
import CompaniesView from './components/CompaniesView'
import BranchesView from './components/BranchesView'
import CollaboratorsView from './components/CollaboratorsView'

export default function App() {
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [selectedBranch, setSelectedBranch] = useState(null)

  const handleBackToCompanies = () => {
    setSelectedCompany(null)
    setSelectedBranch(null)
  }

  const handleBackToBranches = () => {
    setSelectedBranch(null)
  }

  return (
    <>
      <header className="header">
        <h1>Company Manager</h1>
        {(selectedCompany || selectedBranch) && (
          <nav className="header-nav">
            <button onClick={handleBackToCompanies}>Empresas</button>
          </nav>
        )}
      </header>

      <div className="container">
        {!selectedCompany && (
          <CompaniesView onSelectCompany={(c) => setSelectedCompany(c)} />
        )}

        {selectedCompany && !selectedBranch && (
          <BranchesView
            company={selectedCompany}
            onBack={handleBackToCompanies}
            onSelectBranch={(b) => setSelectedBranch(b)}
          />
        )}

        {selectedCompany && selectedBranch && (
          <CollaboratorsView
            branch={selectedBranch}
            onBack={handleBackToBranches}
          />
        )}
      </div>

      <Notification />
    </>
  )
}
