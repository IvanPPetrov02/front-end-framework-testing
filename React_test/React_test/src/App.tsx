import React from "react";
import FlowComponent from "./FlowComponent";

function App() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Flow Diagram Designer</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Create, connect, and customize flow diagrams with drag-and-drop nodes. Double-click on any node or connection to remove it.
                    </p>
                </header>
                
                <main>
                    <FlowComponent />
                </main>
            </div>
        </div>
    );
}

export default App;
